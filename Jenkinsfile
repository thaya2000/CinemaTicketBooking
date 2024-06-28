pipeline {
    agent any

    environment {
        // GITHUB_TOKEN = credentials('github-token')
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
                    // Checkout code from GitHub using token
                    git url: 'https://github.com/thaya2000/CinemaTicketBooking.git', branch: 'main'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build Node.js (Express) application
                    sh 'cd server && npm install'

                    // Skip build step if not needed for server
                    // sh 'cd server && npm run build'

                    // Build React application
                    sh 'cd client && npm install && npm run build'
                }
            }
        }

        // stage('Test') {
        //     steps {
        //         script {
        //             // Run Unit Tests
        //             sh 'cd server && npm test'
        //             sh 'cd client && npm test'
        //         }
        //     }
        // }

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
                    sh 'kubectl apply -f k8s/mongodb.yml'

                    // Deploy MERN stack applications
                    sh 'kubectl apply -f k8s/deployment.yml'
                    sh 'kubectl apply -f k8s/service.yml'
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
