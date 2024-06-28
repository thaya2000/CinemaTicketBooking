pipeline {
    agent any

    environment {
        PORT_CLIENT = credentials('PORT_CLIENT_CI')
        REACT_APP_API = credentials('REACT_APP_API_CI')
        PORT_SERVER = credentials('PORT_SERVER_CI')
        MONGO_URI = credentials('MONGO_URI_CI')
        JWT_SECRET = credentials('JWT_SECRET_CI')
        CLIENT_DOCKER_IMAGE = 'cinema-client'
        SERVER_DOCKER_IMAGE = 'cinema-server'
        KUBECONFIG = credentials('KUBECONFIG_CI')
    }

    tools {
        kubectl 'kubectl'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout code from GitHub
                    git url: 'https://github.com/thaya2000/CinemaTicketBooking.git', branch: 'main'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build Node.js (Express) application
                    sh 'cd server && npm install'

                    // Build React application with CI=false
                    sh 'cd client && npm install && CI=false npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Ensure previous Minikube state is cleared
                    sh 'minikube delete || true'
                    // Start Minikube with adjusted resources
                    sh 'minikube start --memory=2200 --cpus=2'
                    // Set up Docker environment to use Minikube's Docker daemon
                    sh 'eval $(minikube docker-env)'
                    // Build Docker images in Minikube's Docker environment
                    sh 'docker build -t ${SERVER_DOCKER_IMAGE}:${GIT_COMMIT} ./server'
                    sh 'docker build -t ${CLIENT_DOCKER_IMAGE}:${GIT_COMMIT} ./client'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy MongoDB
                    sh 'kubectl apply -f k8s/mongodb.yml --validate=false --kubeconfig=${KUBECONFIG}'

                    // Deploy MERN stack applications
                    sh 'kubectl apply -f k8s/deployment.yml --validate=false --kubeconfig=${KUBECONFIG}'
                    sh 'kubectl apply -f k8s/service.yml --validate=false --kubeconfig=${KUBECONFIG}'
                }
            }
        }

        stage('Post-Deployment Tests') {
            steps {
                script {
                    // Get Minikube IP
                    def minikubeIp = sh(script: 'minikube ip', returnStdout: true).trim()
                    
                    // Get NodePort for the cinema-client service
                    def nodePort = sh(script: "kubectl get svc cinema-client -o=jsonpath='{.spec.ports[0].nodePort}' --kubeconfig=${KUBECONFIG}", returnStdout: true).trim()
                    
                    // Wait for the service to be up and running
                    timeout(time: 3, unit: 'MINUTES') {
                        waitUntil {
                            script {
                                def status = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://${minikubeIp}:${nodePort}", returnStdout: true).trim()
                                return status == '200'
                            }
                        }
                    }
                    
                    // Run post-deployment tests
                    sh "curl -f http://${minikubeIp}:${nodePort} || exit 1"
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Clean up Minikube resources
                    sh 'minikube delete'
                }
            }
        }

        stage('Rollback') {
            when {
                expression { currentBuild.result == 'FAILURE' }
            }
            steps {
                script {
                    // Rollback to previous stable version
                    sh 'kubectl rollout undo deployment/cinema-server --kubeconfig=${KUBECONFIG}'
                    sh 'kubectl rollout undo deployment/cinema-client --kubeconfig=${KUBECONFIG}'
                }
            }
        }
    }

    post {
        failure {
            script {
                // Notify about the failure (e.g., send an email or a message to a Slack channel)
                echo "Build failed!"
                // Add any other notification steps here
            }
        }

        always {
            script {
                // Ensure Minikube is stopped to free up resources
                sh 'minikube stop'
            }
        }
    }
}
