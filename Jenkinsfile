pipeline {
    agent any
    environment {
        BUILD_VERSION = "${BRANCH_NAME}-${BUILD_NUMBER}"
    }
    stages {
        stage('Setup') {
            steps {
                sh 'docker build -t here-tracking-js .'
            }
        }
        stage('Build') {
            steps {
                sh 'docker run --rm -v /usr/src/app/node_modules -v `pwd`:/usr/src/app here-tracking-js npm run dev'
                sh 'docker run --rm -v /usr/src/app/node_modules -v `pwd`:/usr/src/app here-tracking-js npm run build'
                sh 'docker run --rm -v /usr/src/app/node_modules -v `pwd`:/usr/src/app here-tracking-js chown -R `id -u`:`id -g` lib'
                archiveArtifacts artifacts: "lib/*.js", fingerprint: true
            }
        }
        stage('Test'){
            steps {
                sh 'docker run --rm -v /usr/src/app/node_modules -v `pwd`:/usr/src/app here-tracking-js npm run lint -- -f checkstyle -o lint_result.xml'
                sh 'docker run --rm -v /usr/src/app/node_modules -v `pwd`:/usr/src/app here-tracking-js chown `id -u`:`id -g` lint_result.xml'
                checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: "**/lint_result.xml", unHealthy: ''
                sh 'docker run --rm -v /usr/src/app/node_modules -v `pwd`:/usr/src/app here-tracking-js npm run test'
            }
        }
    }
    post {
        always {
            echo 'Cleanup'
            step([$class: 'WsCleanup'])
            sh 'docker rmi `docker images -q --filter "dangling=true"` || true'
        }
        success {
            echo 'Success!!!'
        }
        failure {
            echo 'Failure ;('
        }
        unstable {
            echo 'Unstable'
        }
        changed {
            echo 'State changed'
        }
    }
}
