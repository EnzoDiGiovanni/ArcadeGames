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
  scoreText;
const keys = {};

function preload() {
  // Charger les assets ici
}

function create() {
  // Créer les joueurs comme des rectangles
  player1 = this.add.rectangle(50, 300, 20, 100, 0xffffff);
  player2 = this.add.rectangle(750, 300, 20, 100, 0xffffff);

  // Créer la balle comme un cercle
  ball = this.add.circle(400, 300, 10, 0xffffff);

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
  ball.body.setVelocity(100, 100);

  // Collisions
  this.physics.add.collider(ball, player1);
  this.physics.add.collider(ball, player2);

  // Affichage du score
  scoreText = this.add.text(
    16,
    16,
    `Score: Joueur 1: ${score1} / Joueur 2: ${score2}`,
    {
      fontSize: "32px",
      fill: "#FFF",
    }
  );
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
  if (ball.x - ball.radius <= 0) {
    resetBall();
    score2++;
  } else if (ball.x + ball.radius >= config.width) {
    resetBall();
    score1++;
  }

  if (score1 == 10 || score2 == 10) {
    restartGame();
  }
  scoreText.setText(`Score: Joueur 1: ${score1} / Joueur 2: ${score2}`);
}

function resetBall() {
  ball.setPosition(400, 300);
  ball.body.setVelocity(120, 120);
}

function restartGame() {
  resetBall;
  score1 = 0;
  score2 = 0;
}
