## [Coding Adventure: Ant and Slime Simulations](https://www.youtube.com/watch?v=X-iSQQgOd1A&t=1s)

  - Relação com o "traveling sales man problem" 
    - Encontrar algo "proximo da melhor" rapidamente
    - "ant colony optimization"
      - A probabilidade de ela escolher o proximo ponto no caminho eh diretamente relacionado com a distancia
      - Faz varios caminho e ve os melhores(caminho de ferormonio)
      - Probabilidade é distancia * trilha de ferormonio
      - Mtos parametros
  - Fez codigo no unity pra formiga seguir um ponto verde(no ponteiro do mouse)
  - a cada frame da uma mudada na direção da formiga em uma direção aleatoria
  - perceber se tem alimento na frente dela e ir na direção da formiga
  - Na real as formiga pode usar luz polarizada e reconhecer o espaço pra reconhecer o caminho de volta pra casa
  - na implementação dele
    - elas dexam ferormonio azul quando sai de casa e segue o vermelho
    - quando pega comida começa a soltar o vermelho e segue o azul
    - cada formiga ve a concentração do feromonio em 3 regioes: frente direita e esquerda e vai naquela direção + um poco de aleatoriedade
    - referencia: *"paper na descrição(axo)"*
    - adicionou evaporação no ferormonio
    - queria adicionar difusao mas n adicionou ainda
  - detecção de colisao
  - geração procedural de mapas
  - pincel pra adicionar ou tirar obstaculos no mapa
    - podia ter feito tudo isso no paint
  - formigas reais podem adicionar ferormonio repelente quando a fonte de comida acaba
  - simulação do slime mold:
    - implementou como um 'compute shader'(+ performace, gpu)
    - criar input pseudo aleatorio
    - agente
      - posição e angulo
    - update
      - move agente no angulo , detecta colisao e se detectar muda o angulo
      - subtrai um pouco de todos os pixels(evaporação)
      - difusão(blur na imagem)
      - mesma implementeção de escolher direção de antes
    - diferentes especies
      - repele das especies diferentes

### Referencias na descrição

- Slime pattern paper https://uwe-repository.worktribe.com/...​
- Slime write-up and cool examples https://sagejenson.com/physarum​
- Ant simulation video by Pezzza https://youtu.be/81GQNPJip2Y​
- Slime video by Deep Look https://www.youtube.com/watch?v=Nx3Uu...​
- Physarum project by Michael Fogleman https://github.com/fogleman/physarum

## [C++ Ants Simulation - 2](https://www.youtube.com/watch?v=emRXBr5JvoY)

- pontos store posição tipo e intendidade
  - vermelho casa
  - azul comida
- cada formiga tem coeficiente de liberdade
  - tendencia de sair do caminho
  - potencialmente descobrir novos caminhos
- evaporação possibilita otimização do caminho

## [Coding Adventure: Compute Shaders](https://www.youtube.com/watch?v=9RHGLZLUuwc)

- paralelo na gpu
- ray tracing
  - um raio pra cada pixel sai da camera e ve qual eh a cor
  - sombra
    - quando faz um raio faz um raio até origem da luz e ve se tem sombra ou nao
  - reflexo
    - cada raio gera um raio refletido e a somatoria de todos esses raios eh o reflexo
- codigo de erosão
  - funçao "kernel"
    - simula 1 gota
  - shader roda varias em paralelo
  - atrimuto (numthreads)
    - quantas kernel em 1 grupo na tread main especifica quantos grupos precisa
    - read/write buffer de floats
        -metodos pra setar e pegar dados

## [Asynchronous vs Multithreading and Multiprocessing Programming (The Main Difference)](https://www.youtube.com/watch?v=0vFgKr5bjWI)

- sinchronous operantions 
  - when you make a request the process(1 thread does the work)
  - a thread esoera ternubar de ler o disco(blocking)

- asychronous operations 
  - non blocking
  - single thread
  - 

- multi thread
  - tem problema se as thread acessa um recurso ao memo tempo
  - evil
  - hard

- multi processing
  - instead of sininning up a thread, you just spin up multiple processes and comunicate messages between them
  - escalavel em maquinas diferentes
  
## [When is NodeJS Single Threaded and when is it multi-threaded?](https://www.youtube.com/watch?v=gMtchRodC2I)

- event loop
  - a loop that is aways running and look for work to do
  - event loop pode ser blokeado pela thread do event loop
    - while true
  - componente nativo libuv
    - node usa
    - pra io e cpu intesive operations
      - io:
        - dns
        - fyle system
      - cpu
        - crypto
        - zlib
    - env.uv_threadpool_size: numero maximo de threads
    - se colocar mta computaçao no requests no express a aplicaçao vai fica uma merda
  - modulo cluster
    - se for master
      - n thread = n cpu (os.cpus())
      - pra n cluster.fork
    - else
      - o q rola nas threads
      - .list na thread
          - essa funçao sabe se eh fork
          - se for fork pede pro master ouvir no soket
          - hook no evento da main
  
## [javascript web workers tutorial ( introduction to multithreading in js )](https://www.youtube.com/watch?v=pMK-jcOAYI8) 

- javascript eh single thread, entao uma computaçao pode travar a ui
- web worker permite criar um novo script no background
- comunicaçao por mensagens
  - postmessage()
  - onmessage()
- checa se worker ta disponivel
        
        if(window.Worker)
        const woeker new Worker(this.funcao on message)
        worker.postMessage({})

        worker.onmessage = quando o resultado chega

- nao tem acesso a
  - window
  - document
  - parent
  - (sem dom manipulation)
- tem acesso a
  - navegador
    - user agent
    - geolocation
    - ...
  - location
  - cache
  - criar novos workers
- mywork.terminate

## [to Build Tetris in React - GameDev Tutorial (with React Hooks!)](https://www.youtube.com/watch?v=ZGOaCxX8HIU)