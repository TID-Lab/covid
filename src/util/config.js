const { config } = require('dotenv');
const { cpus } = require('os');
const { join } = require('path');

/**
 * A secure config system that exposes secrets, keys, and more
 * via a simple JSON object that can be imported from other modules.
 */

if (process.env.NODE_ENV !== 'production') {
  config();
}

module.exports = {
  api: {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
  },
  db: {
    name: process.env.DB_NAME || 'data',
    url: process.env.DB_URL || 'mongodb://localhost:27017/data',
  },
  thread: {
    maxThreadCount: parseInt(process.env.MAX_THREAD_COUNT, 10) || cpus().length,
  },
  scraper: {
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
    logFolder: join(__dirname, '..', '..', 'logs'),
    minInterval: 900000,
    maxPostsRequiringLogin: 10,
    browse: {
      maxWaitVariance: 1500,
      defaultTimeout: 10000,
      recentCommentCount: 10,
      selectors: {
        loginNotice: '._585r',
        $1: {
          init: '._62uh',
          notNowButton: '#expanding_cta_close_button',
        },
        $2: {
          sortOptionPrefix: '._54nf > li:nth-child',
        },
        v1: {
          $2: {
            sortButton: '._7a99',
          },
          $4: {
            viewMoreCommentsButton: '._7a94 > ._4swz > a',
          },
          shared: {
            initCommentsButton: 'form ._3hg-',
            commentList: '._7a9a',
          },
        },
        v2: {
          $2: {
            sortButton: '._3scs > a',
            video: '._ox1',
            pauseButton: '._zbd._2sm1._42ft',
          },
          $4: {
            viewMoreCommentsButton: '.UFIPagerLink',
          },
          shared: {
            initCommentsButton: '._524d > a',
            commentList: '._3b-9 > div',
          },
        },
      },
    },
    scrape: {
      selectors: {
        v1: {
          text: '._3l3x',
          media: '._6c7h',
          metadata: '._6qw7',
          author: '._6qw4',
        },
        v2: {
          comment: '.UFIComment',
          text: '.UFICommentBody',
          media: 'TODO',
          metadata: '.uiLinkSubtle',
          author: '.UFICommentActorName',
        },
      },
    },
  },
};
