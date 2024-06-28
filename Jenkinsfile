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
        PATH = "${env.PATH}:${env.WORKSPACE}/bin"
    }

    stages {
        stage('Install kubectl') {
            steps {
                script {
                    // Create a bin directory in the workspace
                    sh 'mkdir -p ${WORKSPACE}/bin'
                    
                    // Install kubectl if not already installed
                    sh '''
                    if ! command -v kubectl &> /dev/null; then
                        echo "kubectl could not be found. Installing kubectl..."
                        curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                        chmod +x kubectl
                        mv kubectl ${WORKSPACE}/bin/
                    else
                        echo "kubectl is already installed."
                    fi
                    '''
                }
            }
        }

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
                    // Start Minikube with adjusted resources and a specific Kubernetes version
                    sh 'minikube start --memory=2200 --cpus=2 --kubernetes-version=v1.20.0'
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
                    sh 'kubectl apply -f k8s/mongodb.yml --validate=false --kubeconfig=/var/lib/jenkins/.kube/config'

                    // Deploy MERN stack applications
                    sh 'kubectl apply -f k8s/deployment.yml --validate=false --kubeconfig=/var/lib/jenkins/.kube/config'
                    sh 'kubectl apply -f k8s/service.yml --validate=false --kubeconfig=/var/lib/jenkins/.kube/config'
                }
            }
        }

        stage('Post-Deployment Tests') {
            steps {
                script {
                    // Get Minikube IP
                    def minikubeIp = sh(script: 'minikube ip', returnStdout: true).trim()
                    
                    // Get NodePort for the cinema-client service
                    def nodePort = sh(script: "kubectl get svc cinema-client -o=jsonpath='{.spec.ports[0].nodePort}' --kubeconfig=/var/lib/jenkins/.kube/config", returnStdout: true).trim()
                    
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

        stage('Rollback') {
            when {
                expression { currentBuild.result == 'FAILURE' }
            }
            steps {
                script {
                    // Rollback to previous stable version
                    sh 'kubectl rollout undo deployment/cinema-server --kubeconfig=/var/lib/jenkins/.kube/config'
                    sh 'kubectl rollout undo deployment/cinema-client --kubeconfig=/var/lib/jenkins/.kube/config'
                }
            }
        }
    }
}
