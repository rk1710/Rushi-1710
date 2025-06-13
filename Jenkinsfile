pipeline {
    agent any

    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        IMAGE_NAME = "chatapp"
        DOCKER_IMAGE = "harry1710/${IMAGE_NAME}"
    }

    stages {

        stage('Cleanup Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                sh 'git clone -b main https://github.com/rk1710/Rushi-1710.git'
            }
        }

        stage('Check Workspace Files') {
            steps {
                sh 'ls -la'
                sh 'ls -la Rushi-1710'
            }
        }

        stage('Build Docker Image') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -f Rushi-1710/chatApp/Dockerfile Rushi-1710/chatApp"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-token', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh """
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                    docker run -d --name ${IMAGE_NAME} -p 9000:9000 ${DOCKER_IMAGE}:${IMAGE_TAG}
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
