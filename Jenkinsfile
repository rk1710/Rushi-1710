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

        stage('Build Docker Image') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh "docker build -t harry1710/chatapp:${IMAGE_TAG} . chatApp"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-token', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh """
                        echo $DOCKER_PASSWORD | docker login -u harry1710 --password-stdin
                        docker push harry1710/chatapp:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy Container') {
             when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
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
