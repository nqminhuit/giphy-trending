# Development Setup
### Build
```bash
$ npm ci
```

### Unit tests
```bash
$ npm test

# or with coverage:
$ npm run test:coverage
```

### Run app
```bash
$ npm start
```
Project runs at http://localhost:5000/

# Deploy to Heroku
Some prerequisites need to be done, see [Heroku document](https://devcenter.heroku.com/articles/container-registry-and-runtime) for more details.
```bash
$ heroku container:push --app nqminhuit-giphy-trending web
$ heroku container:release --app nqminhuit-giphy-trending web
```
Project runs at: https://nqminhuit-giphy-trending.herokuapp.com/

To see nginx log:
```bash
$ heroku logs --app nqminhuit-giphy-trending --tail
```

# Lighthouse benchmark
With Chrome Lighthouse benchmark report, I did some checking on the Production app deployed on Heroku and it reaches some amazing figures:
- on Desktop:
  - around 96/100 points for Performance
  - around 94/100 points for Accessibility
  - 100/100 points for Best Practices
  - 82/100 points for SEO
- on Mobile:
  - around 89/100 points for Performance
  - around 94/100 points for Accessibility
  - 100/100 points for Best Practices
  - around 85/100 points for SEO
