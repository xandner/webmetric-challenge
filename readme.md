## Pull and Run:
- Pull project with command:
```bash
 git clone git@github.com:xandner/webmetric-challenge.git
 ```

 - run this command without any change:
 ```bash
cp .env.example .env
 ```
 ` ! its dont needs to change any thing in .env file`

 - run project with command 
 ```bash
docker compose up
```

### to run test:
+ first you must run redis. run code ` docker run --rm -d --name redis -p 6379:6379 redis `
+ then you must change redis host in .env file to "localhost"
+ now you can run tests with : 
```bash
npm test
```