// /////////////////

document.addEventListener("DOMContentLoaded", function () {
  const rock = document.querySelector(".rock");
  const papers = document.querySelector(".papers");
  const scissors = document.querySelector(".scissors");
  const robotScoreText = document.querySelector(".robotScore");
  const userScoreText = document.querySelector(".userScore");
  const currentUserPlay = document.querySelector(".currentUserPlay");
  const currentRobotPlay = document.querySelector(".currentRobotPlay");
  const restartGameBtn = document.querySelector(".restartGame");

  let randomNbr;
  let userAnswer = 0;
  let userScore = 0;
  let robotScore = 0;

  function playGame(event) {
    userAnswer = parseInt(event.currentTarget.getAttribute("data-choice"), 10);
    randomNbr = Math.floor(Math.random() * 3) + 1;
    updateScore();
    checkWin();
  }

  function updateScore() {
    if (userAnswer == 1) {
      currentUserPlay.textContent = "Vous avez jouez Pierre";
      userScoreText.textContent = "Vous : " + userScore;
    } else if (userAnswer == 2) {
      currentUserPlay.textContent = "Vous avez jouez Papier";
      userScoreText.textContent = "Vous : " + userScore;
    } else {
      currentUserPlay.textContent = "Vous avez jouez Ciseaux ";
      userScoreText.textContent = "Vous : " + userScore;
    }

    if (randomNbr == 1) {
      currentRobotPlay.textContent = "Le robot à joué Pierre";
      robotScoreText.textContent = "Robot : " + robotScore;
    } else if (randomNbr == 2) {
      currentRobotPlay.textContent = "Le robot à joué Papier";
      robotScoreText.textContent = "Robot : " + robotScore;
    } else {
      currentRobotPlay.textContent = "Le robot à joué Ciseaux ";
      robotScoreText.textContent = "Robot : " + robotScore;
    }
  }

  function checkWin() {
    const results = {
      1: {
        1: "Égalité",
        2: "Joueur gagne",
        3: "Robot gagne",
      },
      2: {
        1: "Robot gagne",
        2: "Égalité",
        3: "Joueur gagne",
      },
      3: {
        1: "Joueur gagne",
        2: "Robot gagne",
        3: "Égalité",
      },
    };

    const outcome = results[randomNbr][userAnswer];

    switch (outcome) {
      case "Joueur gagne":
        userScore += 1;
        break;
      case "Robot gagne":
        robotScore += 1;
        break;
      case "Égalité":
        break;
    }

    // Pour retirer les écouteurs, assurez-vous que la condition de victoire est vérifiée :
    if (userScore == 3 || robotScore == 3) {
      rock.removeEventListener("click", playGame);
      papers.removeEventListener("click", playGame);
      scissors.removeEventListener("click", playGame);

      if (userScore == 3 || robotScore == 3) {
        rock.removeEventListener("click", playGame);
        papers.removeEventListener("click", playGame);
        scissors.removeEventListener("click", playGame);

        // Affichez le message de victoire ou de défaite ici
        const winningMessage = document.querySelector(".winningMessage");
        if (userScore == 3) {
          winningMessage.textContent = "Bravo, vous avez gagné !";
        } else if (robotScore == 3) {
          winningMessage.textContent = "Dommage, le robot a gagné !";
        }
      }
      // Affichez le message de victoire ou de défaite ici
    }
    updateScore();
  }

  // Ajoutez les écouteurs d'événements
  rock.addEventListener("click", playGame);
  papers.addEventListener("click", playGame);
  scissors.addEventListener("click", playGame);

  restartGameBtn.addEventListener("click", restartGame);

  function restartGame() {
    location.reload();
  }
});
