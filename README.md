# cloudwalk -- Software Engineer test

technical challenge by cloudwalk. all the requirements can be found here.

## Project explaning

### coments
I tried to create my project more organized, reusable, and flexible as possible. **I have tried to apply solid principles with TDD.** Explaining the folder structure:

#### controllers
This folder is responsible for managing all request logic that will be sent to the routes.

#### services
This folder is responsible for separating all business logic. I have tried to follow solid principles, isolating everything.

#### logs
This folder is responsible for the quake log file that we are analyzing.

#### tests
In my opinion one of the most interesting parts of this project. I tried to follow the TDD principles, writing tests and mocks for every single component of this project.

## Project settings

This project was implemented with docker, you just need to build the container for the project works.

> docker-compose up

if you dont want to use the docker image, you just need to type:

> npm start

## Api Docs

The Api have two routes. One responsible to show game reports and another with the rank by kills

 > **GET** cloudwalk.localhost/

  ```json
  "data": [
  {
      "match": 4,
      "total_kills": 105,
      "players": [
        "Dono da Bola",
        "Isgalamido",
        "Zeh",
        "Assasinu Credi"
      ],
      "kills": [
        {
          "player": "Isgalamido",
          "kills": 21
        },
        {
          "player": "Dono da Bola",
          "kills": 15
        },
        {
          "player": "Zeh",
          "kills": 20
        },
        {
          "player": "Assasinu Credi",
          "kills": 15
        }
      ],
      "death_causes": [
        {
          "cause": "MOD_TRIGGER_HURT",
          "count": 9
        },
        {
          "cause": "MOD_FALLING",
          "count": 11
        },
        {
          "cause": "MOD_ROCKET",
          "count": 20
        },
        {
          "cause": "MOD_RAILGUN",
          "count": 8
        },
        {
          "cause": "MOD_ROCKET_SPLASH",
          "count": 51
        },
        {
          "cause": "MOD_MACHINEGUN",
          "count": 4
        },
        {
          "cause": "MOD_SHOTGUN",
          "count": 2
        }
      ]
    },
    ...
  ]
  ```
   > **GET** cloudwalk.localhost/rank

  ```json
  {
    "data": [
      {
        "player": "Isgalamido",
        "kills": 159
      },
      {
        "player": "Zeh",
        "kills": 132
      },
      {
        "player": "Oootsimo",
        "kills": 124
      },
      ...
    ]
  }
  ```
  ## How run the tests
  
  using docker:
  
  Atention: the container should be runing
  
  >  docker exec -it cloudwalk-challenge_app_1 sh -c "npm test"       

  if you are not using docker, just type:
 
 > npm test
