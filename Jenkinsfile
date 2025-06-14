pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-token') 
        IMAGE_TAG = "${BUILD_NUMBER}"       
        DOCKER_IMAGE = "harry1710/chatapp"          
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
                    sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -f Rushi-1710/Dockerfile Rushi-1710 | tee /dev/null"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_HUB_TOKEN')]) {
                    sh """
                        echo \$DOCKER_HUB_TOKEN | docker login -u harry1710 --password-stdin
                        docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                    """
                }
            }
        }
        stage('Deploy Container') {
            steps {
                sh """
                    docker run -d --name chatapp -p 9000:9000 ${DOCKER_IMAGE}:${IMAGE_TAG}
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
