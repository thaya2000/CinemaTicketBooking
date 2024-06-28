pipeline {
    agent any

    environment {
        KUBECONFIG = '/var/lib/jenkins/kubeconfig' // Adjust path as needed
        PORT_CLIENT = credentials('PORT_CLIENT_CI')
        REACT_APP_API = credentials('REACT_APP_API_CI')
        PORT_SERVER = credentials('PORT_SERVER_CI')
        MONGO_URI = credentials('MONGO_URI_CI')
        JWT_SECRET = credentials('JWT_SECRET_CI')
        CLIENT_DOCKER_IMAGE = 'thayanan/cinema-client'
        SERVER_DOCKER_IMAGE = 'thayanan/cinema-server'
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
                    sh 'kubectl apply -f k8s/mongodb.yml --validate=false'

                    // Deploy MERN stack applications
                    sh 'kubectl apply -f k8s/deployment.yml --validate=false'
                    sh 'kubectl apply -f k8s/service.yml --validate=false'
                }
            }
        }

        stage('Post-Deployment Tests') {
            steps {
                script {
                    // Run post-deployment tests
                    sh 'curl -f http://$(minikube ip):NodePort || exit 1'
                }
            }
        }

        stage('Rollback') {
            when {
                expression { return currentBuild.result == 'FAILURE' }
            }
            steps {
                script {
                    // Rollback to previous stable version
                    sh 'kubectl rollout undo deployment/cinema-server'
                    sh 'kubectl rollout undo deployment/cinema-client'
                }
            }
        }
    }
}
