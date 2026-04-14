// Before: Jenkins pipeline using a Groovy shared library.
// This is the pattern this repo migrated away from.
// See .github/workflows/ for the GitHub Actions equivalent.
//
// Translation map:
//   @Library + call()            → workflow_call reusable workflow
//   agent { label '...' }        → runs-on: [self-hosted, <label>]
//   parallel { stage(...) }      → strategy.matrix
//   post { always / failure }    → if: always() / if: failure()
//   parameters { choice/string } → workflow_dispatch inputs
//   triggers { cron }            → schedule
//   credentials(...)             → secrets: inherit
//   publishHTML                  → actions/upload-pages-artifact + deploy-pages

@Library('dell-ci-shared') _

pipeline {
  agent { label 'playwright-runner' }

  parameters {
    choice(
      name: 'RUNNER',
      choices: ['ubuntu-latest', 'self-hosted'],
      description: 'Runner type'
    )
    string(
      name: 'BASE_URL',
      defaultValue: 'https://www.dell.com/en-uk',
      description: 'Target base URL'
    )
  }

  triggers {
    cron('0 8 * * *')
  }

  environment {
    DELL_EMAIL    = credentials('dell-email')
    DELL_PASSWORD = credentials('dell-password')
  }

  stages {
    stage('Setup') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Test') {
      parallel {
        stage('01-homepage')            { steps { sh "npx playwright test tests/01-homepage.spec.ts"            } }
        stage('02-navigation')          { steps { sh "npx playwright test tests/02-navigation.spec.ts"          } }
        stage('03-search')              { steps { sh "npx playwright test tests/03-search.spec.ts"              } }
        stage('04-search-results-filter') { steps { sh "npx playwright test tests/04-search-results-filter.spec.ts" } }
        stage('05-product-listing')     { steps { sh "npx playwright test tests/05-product-listing.spec.ts"     } }
        stage('06-product-detail')      { steps { sh "npx playwright test tests/06-product-detail.spec.ts"      } }
        stage('07-add-to-cart')         { steps { sh "npx playwright test tests/07-add-to-cart.spec.ts"         } }
        stage('08-cart-page')           { steps { sh "npx playwright test tests/08-cart-page.spec.ts"           } }
        stage('09-cookie-consent')      { steps { sh "npx playwright test tests/09-cookie-consent.spec.ts"      } }
        stage('10-login')               { steps { sh "npx playwright test tests/10-login.spec.ts"               } }
        stage('11-account-dashboard')   { steps { sh "npx playwright test tests/11-account-dashboard.spec.ts"   } }
        stage('12-order-history')       { steps { sh "npx playwright test tests/12-order-history.spec.ts"       } }
        stage('13-breadcrumbs')         { steps { sh "npx playwright test tests/13-breadcrumbs.spec.ts"         } }
        stage('14-product-gallery')     { steps { sh "npx playwright test tests/14-product-gallery.spec.ts"     } }
        stage('15-404-handling')        { steps { sh "npx playwright test tests/15-404-handling.spec.ts"        } }
      }
    }

    stage('Report') {
      steps {
        sh 'npx playwright merge-reports --reporter html ./blob-reports'
        publishHTML(target: [
          reportDir:   'playwright-report',
          reportFiles: 'index.html',
          reportName:  'Playwright Report',
          keepAll:     true
        ])
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'blob-report/**', allowEmptyArchive: true
    }
    failure {
      slackSend(
        channel: '#ci-alerts',
        color: 'danger',
        message: "Dell E2E tests failed on `${env.BRANCH_NAME}` — ${env.BUILD_URL}"
      )
    }
  }
}
