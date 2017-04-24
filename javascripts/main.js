$(document).ready(function() {

	const player1 = [];
	const player2 = [];
	let winningPlayer = 0
	let winnerBadges = [];




		// const animation = (winningPlayer) => {
		// 		var max = player1[winningPlayer].badges.length
		// 		var r = Math.floor((Math.random() * max) + 1);
		// 		console.log("loop");
		// 		console.log(player1[winningPlayer].badges[r].icon_url)
		// 		$('.winner-td').html('<img src="' + player1[winningPlayer].badges[r].icon_url + '" class="image1" width="25" height="25">')
		// 	    $('.image1').animate({left: "+=300px"}, 1000);
		// 	}
		
	let x = 0;

	const animation = () => {
		const go = () => {
			console.log("go", x)
			$('.winner-td').html('<img src="' + winnerBadges[x] + '" class="image1" width="50" height="50">')
			var r = Math.floor((Math.random() * 8) + 1);
			console.log(r);
		    if (r === 1) {
			    $('.image1').animate({left: "+=300px", top: "+=300px"}, 500);
			}
		    if (r === 2) {
			    $('.image1').animate({left: "+=300px", top: "-=300px"}, 500);
			}
		    if (r === 3) {
			    $('.image1').animate({left: "+=300px"}, 500);
			}
		    if (r === 4) {
			    $('.image1').animate({top: "+=300px"}, 500);
		    }
		    if (r === 5) {
			    $('.image1').animate({left: "-=300px", top: "+=300px"}, 500);
			}   
		    if (r === 6) {
			    $('.image1').animate({left: "-=300px", top: "-=300px"}, 500);
		    }
		    if (r === 7) {
			    $('.image1').animate({left: "-=300px"}, 500);
		    }
		    if (r === 8) {
			    $('.image1').animate({top: "-=300px"}, 500);
		    }
		    console.log("x", x);
		    if (x++ < (player1[winningPlayer].badges.length - 1)) {
		    	setTimeout(animation, 300);
		    }
	    }
		go();
		return false
	};

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

				if (player1[i].points.total > winnerPoints) {
					winnerBadges = [];
					winnerPoints = player1[i].points.total;
					for (var j = 0; j < player1[i].badges.length; j++) {
						winnerBadges.push(player1[i].badges[j].icon_url);						
					}
					winner = player1[i].name;
				}
			}
				if (player1[0].points.total > player1[1].points.total) {
					$('#player1-img-div').addClass('winner-td');
					x = 0
					animation();
				} else {
					$('#player2-img-div').addClass('winner-td');
					let winningPlayer = 1
					x = 0
					animation();
				}
				$('.fight').addClass('winner').html(winner + " wins!<br><span>Enter two more contestants to fight again!</span>");
				$('.form-control').val("");

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