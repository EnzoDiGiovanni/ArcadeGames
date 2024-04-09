const JcJ = document.querySelector(".JcJ");
const JcR = document.querySelector(".JcR");
const gameContainer = document.querySelector(".gameContainer");
const countdown = document.querySelector(".countdown");

JcJ.addEventListener("click", startCountdownJcJ);
JcR.addEventListener("click", startCountdownJcR);

function startCountdownJcJ() {
  gameContainer.style.display = "none";

  let countdown = 3;
  const countdownDisplay = document.querySelector("#countdownDisplay"); // Sélectionne l'élément pour afficher le compte à rebours
  countdownDisplay.textContent = `Le jeu démarre dans ${countdown}...`; // Affiche le texte initial du compte à rebours

  const countdownInterval = setInterval(() => {
    countdown--; // Décrémente le compte à rebours
    if (countdown > 0) {
      countdownDisplay.textContent = `Le jeu démarre dans ${countdown}...`; // Met à jour l'affichage du compte à rebours
    } else if (countdown === 0) {
      countdownDisplay.textContent = "GO!"; // Affiche "GO!" quand le compte à rebours atteint 0
    } else {
      clearInterval(countdownInterval); // Arrête le compte à rebours
      countdownDisplay.textContent = "Le premier à 10 points gagne !";
      startGameJcJ(); // Démarre le jeu
    }
  }, 1000);
}
function startCountdownJcR() {
  gameContainer.style.display = "none";

  let countdown = 3;
  const countdownDisplay = document.querySelector("#countdownDisplay"); // Sélectionne l'élément pour afficher le compte à rebours
  countdownDisplay.textContent = `Le jeu démarre dans ${countdown}...`; // Affiche le texte initial du compte à rebours

  const countdownInterval = setInterval(() => {
    countdown--; // Décrémente le compte à rebours
    if (countdown > 0) {
      countdownDisplay.textContent = `Le jeu démarre dans ${countdown}...`; // Met à jour l'affichage du compte à rebours
    } else if (countdown === 0) {
      countdownDisplay.textContent = "GO!"; // Affiche "GO!" quand le compte à rebours atteint 0
    } else {
      clearInterval(countdownInterval); // Arrête le compte à rebours
      countdownDisplay.textContent = "Le premier à 10 points gagne !";
      startGameJcR(); // Démarre le jeu
    }
  }, 1000);
}

function startGameJcJ() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  const game = new Phaser.Game(config);

  let player1,
    player2,
    ball,
    score1 = 0,
    score2 = 0,
    scoreText1,
    scoreText2;

  const keys = {};

  function preload() {
    // Charger les assets ici
    this.load.image("ball", "img/ball.png");
    this.load.image("background", "img/background.png");
  }

  function create() {
    // Background
    this.add.image(400, 300, "background");

    // Créer les joueurs comme des rectangles
    player1 = this.add.rectangle(50, 300, 20, 100, 0xffffff);
    player2 = this.add.rectangle(750, 300, 20, 100, 0xffffff);

    // Créer la balle comme un cercle
    // ball = this.add.circle(400, 300, 10, 0xffffff);
    ball = this.add.sprite(400, 300, "ball").setScale(1.5);

    // Ajouter la physique
    this.physics.add.existing(player1);
    this.physics.add.existing(player2);
    this.physics.add.existing(ball);

    // Paramètres des joueurs
    [player1, player2].forEach((player) => {
      player.body.immovable = true;
      player.body.setCollideWorldBounds(true);
    });

    // Créer l'input du clavier
    keys.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keys.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keys.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    // Paramètres de la balle
    ball.body.setCollideWorldBounds(true);
    ball.body.setBounce(1, 1);
    ball.body.setVelocity(300, 300);

    // Collisions

    this.physics.add.collider(ball, player1, ballCollisonHandler);
    this.physics.add.collider(ball, player2, ballCollisonHandler);

    // Affichage du score

    scoreText1 = this.add.text(200, 70, score1, {
      fontSize: "60px",
      fill: "#FFF",
    });
    scoreText2 = this.add.text(600, 70, score2, {
      fontSize: "60px",
      fill: "#FFF",
    });

    scoreText1.setOrigin(0.5, 0.5);
    scoreText2.setOrigin(0.5, 0.5);
  }

  function update() {
    // Contrôle du joueur 1
    if (keys.z.isDown) {
      player1.body.setVelocityY(-600);
    } else if (keys.s.isDown) {
      player1.body.setVelocityY(600);
    } else {
      player1.body.setVelocityY(0);
    }

    // Contrôle du joueur 2
    if (keys.up.isDown) {
      player2.body.setVelocityY(-600);
    } else if (keys.down.isDown) {
      player2.body.setVelocityY(600);
    } else {
      player2.body.setVelocityY(0);
    }

    // Gestion des points
    handleScoring();
  }

  function handleScoring() {
    // Ajuster la détection de collision avec les murs en utilisant la largeur du sprite
    if (ball.x <= ball.width) {
      resetBall();
      score2++;
    } else if (ball.x >= config.width - ball.width) {
      resetBall();
      score1++;
    }

    if (score1 == 10 || score2 == 10) {
      restartGame();
    }
    scoreText1.setText(score1);
    scoreText2.setText(score2);
  }

  function resetBall() {
    ball.setPosition(400, 300);
    ball.body.setVelocity(300, 300);
  }

  function restartGame() {
    resetBall();
    score1 = 0;
    score2 = 0;
  }

  function ballCollisonHandler(ball, player) {
    ball.body.velocity.x *= 1.05;
    ball.body.velocity.y *= 1.05;
  }
}

function startGameJcR() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  const game = new Phaser.Game(config);

  let player1,
    player2,
    ball,
    score1 = 0,
    score2 = 0,
    scoreText1,
    scoreText2;

  const keys = {};

  function preload() {
    // Charger les assets ici
    this.load.image("ball", "img/ball.png");
    this.load.image("background", "img/background.png");
  }

  function create() {
    // Background
    this.add.image(400, 300, "background");

    // Créer les joueurs comme des rectangles
    player1 = this.add.rectangle(50, 300, 20, 100, 0xffffff);
    player2 = this.add.rectangle(750, 300, 20, 100, 0xffffff);

    // Créer la balle comme un cercle
    // ball = this.add.circle(400, 300, 10, 0xffffff);
    ball = this.add.sprite(400, 300, "ball").setScale(1.5);

    // Ajouter la physique
    this.physics.add.existing(player1);
    this.physics.add.existing(player2);
    this.physics.add.existing(ball);

    // Paramètres des joueurs
    [player1, player2].forEach((player) => {
      player.body.immovable = true;
      player.body.setCollideWorldBounds(true);
    });

    // Créer l'input du clavier
    keys.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keys.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keys.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    // Paramètres de la balle
    ball.body.setCollideWorldBounds(true);
    ball.body.setBounce(1, 1);
    ball.body.setVelocity(300, 300);

    // Collisions

    this.physics.add.collider(ball, player1, ballCollisonHandler);
    this.physics.add.collider(ball, player2, ballCollisonHandler);

    // Affichage du score

    scoreText1 = this.add.text(200, 70, score1, {
      fontSize: "60px",
      fill: "#FFF",
    });
    scoreText2 = this.add.text(600, 70, score2, {
      fontSize: "60px",
      fill: "#FFF",
    });

    scoreText1.setOrigin(0.5, 0.5);
    scoreText2.setOrigin(0.5, 0.5);
  }

  function update() {
    // Contrôle du joueur 1
    if (keys.z.isDown) {
      player1.body.setVelocityY(-600);
    } else if (keys.s.isDown) {
      player1.body.setVelocityY(600);
    } else {
      player1.body.setVelocityY(0);
    }

    followBall();
    // Gestion des points
    handleScoring();
  }

  function handleScoring() {
    // Ajuster la détection de collision avec les murs en utilisant la largeur du sprite
    if (ball.x <= ball.width) {
      resetBall();
      score2++;
    } else if (ball.x >= config.width - ball.width) {
      resetBall();
      score1++;
    }

    if (score1 == 10 || score2 == 10) {
      restartGame();
    }
    scoreText1.setText(score1);
    scoreText2.setText(score2);
  }

  function resetBall() {
    ball.setPosition(400, 300);
    ball.body.setVelocity(300, 300);
  }

  function restartGame() {
    resetBall();
    score1 = 0;
    score2 = 0;
  }

  function ballCollisonHandler(ball, player) {
    ball.body.velocity.x *= 1.05;
    ball.body.velocity.y *= 1.05;
  }

  function followBall() {
    // Si la balle est à droite du joueur 2, se déplacer vers la droite
    if (ball.y > player2.y + 10) {
      // '+ 10' pour ajouter un petit délai/erreur dans le suivi
      player2.body.setVelocityY(600); // Vitesse à ajuster selon le besoin
    }
    // Si la balle est à gauche du joueur 2, se déplacer vers la gauche
    else if (ball.y < player2.y - 10) {
      // '- 10' pour ajouter un petit délai/erreur dans le suivi
      player2.body.setVelocityY(-600); // Vitesse à ajuster selon le besoin
    }
    // Si la balle est approximativement alignée avec le joueur 2, arrêter le mouvement
    else {
      player2.body.setVelocityY(0);
    }
  }
}
