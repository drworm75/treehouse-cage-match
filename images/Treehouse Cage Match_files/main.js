$(document).ready(function() {

	var player1 = [];
	var player2 = [];

	const animation = (winningPlayer) => {


		console.log(player1[winningPlayer].badges.length);
		$('.form-control').val("");
		for (var j = 0; j < 1; j++) {
			$('.winner-td').html('<img src="' + player1[winningPlayer].badges[j].icon_url + '" class="image1" width="25" height="25">')
	    $('.image1').animate({left: "+=300px", top: "+=300px"}, 1000);
	    }
	}

	$('.form-control').on('keyup', () => {
		console.log("keyup");
		if ($('#player-one').val() !== "" && $('#player-two').val() !== "") {
			$('.fight').removeClass('winner').html("Ready? Fight!");
		}
	});

	$('.fight').on('click', () => {
		let playerOneURL = "https://teamtreehouse.com/" + ($('#player-one').val()) + ".json";
		let playerTwoURL = "https://teamtreehouse.com/" + ($('#player-two').val()) + ".json";
		let winner = "";


		console.log("player1",player1)

		const playerData = () => {
				let winnerPoints = -10
			for (let i = 0; i < player1.length; i++) {
				let domString = "";
				domString += `<div class="table-responsive">`
				domString += `<table class="table">`
				domString += `<tr><th>${player1[i].name}</th></tr>`
				domString += `<tr><td class="player-points">${player1[i].points.total}</td></tr>`
				domString += `<tr><td class="parent">
				<span id="player${i + 1}-img-div"></span>
				<img src="${
					player1[i].gravatar_url
				}" class="image2" width="200" height="200">
				</td></tr>`
				domString += `</table></div>`
				if (i === 0) {
					$("#player-one-card").html(domString);
				} else {
					$("#player-two-card").html(domString);
				}
					console.log(winnerPoints)
				if (player1[i].points.total > winnerPoints) {
					winnerPoints = player1[i].points.total;
					console.log(winnerPoints)
					winner = player1[i].name;
				}
			}
				if (player1[0].points.total > player1[1].points.total) {
					$('#player1-img-div').addClass('winner-td');
					var winningPlayer = 0
					animation(winningPlayer);
				} else {
					$('#player2-img-div').addClass('winner-td');
					var winningPlayer = 1
					animation(winningPlayer);
				}
				$('.fight').addClass('winner').html(winner + " wins!<br><span>Enter two more contestants to fight again!</span>");

		}
			






		var readyPlayerOne = () => {
				return new Promise((resolve, reject) => {
					// $.ajax(playerOneURL)
					$.ajax("https://teamtreehouse.com/dwaynepate.json")
					.done((data) => {
						console.log(data);
						resolve(data);
					})
					.fail((error) => {
						reject(error);
					});

				});
			};

			var readyPlayerTwo = () => {
				return new Promise((resolve, reject) => {
					// $.ajax(playerTwoURL)
					$.ajax("https://teamtreehouse.com/geoffwebb.json")
					.done((data1) => {
						console.log(data1);
						resolve(data1);
					})
					.fail((error) => {
						reject(error);
					});

				});
			};

			Promise.all([readyPlayerOne(), readyPlayerTwo()])
				.then((result) => {
					result.forEach((ajax) => {
							player1.push(ajax);
					});
					playerData();
				});
		







		});




});