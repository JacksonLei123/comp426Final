
  // var questionNumber = 0;
  // var ParisScore = 0; 
  // var NZScore = 0;
  // var BBScore = 0;
  // var LondonScore = 0;
  // var TokyoScore = 0;
  // var PhuketScore = 0;
  // var BanffScore = 0;
  
  // $('body').on('click', ".submitQuiz", function() {
  //   console.log("hi");
  //   calculateScore();
  // });

  // let calculateScore = function() {
  //   let q1a1 = $('#0-1').prop('checked');
  //   let q1a2 = $('#0-2').prop('checked');
  //   let q1a3 = $('#0-3').prop('checked');
  //   let q1a4 = $('#0-4').prop('checked');

  //   console.log(q1a1);
  //   console.log(q1a2);

  //   let q2a1 = $('#1-1').prop('checked');
  //   let q2a2 = $('#1-2').prop('checked');
  //   let q2a3 = $('#1-3').prop('checked');
  //   let q2a4 = $('#1-4').prop('checked');

  //   let q3a1 = $('#2-1').prop('checked');
  //   let q3a2 = $('#2-1').prop('checked');
  //   let q3a3 = $('#2-3').prop('checked');
  //   let q3a4 = $('#2-4').prop('checked');

  //   let q4a1 = $('#3-1').prop('checked');
  //   let q4a2 = $('#3-2').prop('checked');
  //   let q4a3 = $('#3-3').prop('checked');
  //   let q4a4 = $('#3-4').prop('checked');

  //   let q5a1 = $('#4-1').prop('checked');
  //   let q5a2 = $('#4-2').prop('checked');
  //   let q5a3 = $('#4-3').prop('checked');
  //   let q5a4 = $('#4-4').prop('checked');

  //   let q6a1 = $('#5-1').prop('checked');
  //   let q6a2 = $('#5-2').prop('checked');
  //   let q6a3 = $('#5-3').prop('checked');
  //   let q6a4 = $('#5-4').prop('checked');

  //   // let q7a1 = $('#6-1').prop('checked');
  //   // let q7a2 = $('#6-2').prop('checked');
  //   // let q7a3 = $('#6-3').prop('checked');
  //   // let q7a4 = $('#6-4').prop('checked');

  //   if(q1a1) {
  //     questionNumber++;
  //     BBScore++;
  //     PhuketScore++;
  //   } else if(q1a2) {
  //     questionNumber++;
  //     TokyoScore++;
  //   } else if(q1a3) {
  //     questionNumber++;
  //     LondonScore++;
  //     BanffScore++;
  //   } else if(q1a4) {
  //     questionNumber++;
  //     ParisScore++;
  //     NZScore++;
  //   }

  //   if(q2a1) {
  //     questionNumber++;
  //     ParisScore++;
  //     LondonScore++;
  //     TokyoScore++;
  //   } else if (q2a2) {
  //     questionNumber++;
  //     BBScore++;
  //     PhuketScore++;
  //   } else if (q2a3) {
  //     questionNumber++;
  //     BanffScore++;
  //     NZScore++;
  //   } else if (q2a4) {
  //     questionNumber++;
  //     PhuketScore++;
  //   }

  //   if(q3a1) {
  //     questionNumber++;
  //     BanffScore++;
  //     NZScore++;
  //   } else if (q3a2) {
  //     questionNumber++;
  //     ParisScore++;
  //     TokyoScore++;
  //     BBScore++;
  //   } else if (q3a3) {
  //     questionNumber++;
  //     LondonScore++;
  //     BanffScore++;
  //     TokyoScore++;
  //     ParisScore++;
  //     NZScore++;
  //     PhuketScore++;
  //     BBScore++;
  //   } else if (q3a4) {
  //     questionNumber++;
  //     LondonScore++;
  //     BanffScore++;
  //     NZScore++;
  //   }

  //   if(q4a1) {
  //     questionNumber++;
  //     BBScore++;
  //     NZScore++;
  //     PhuketScore++;
  //     BanffScore++;
  //   } else if (q4a2) {
  //     questionNumber++;
  //     ParisScore++;
  //     LondonScore++;
  //     TokyoScore++;
  //   } else if (q4a3) {
  //     questionNumber++;
  //     ParisScore++;
  //     LondonScore++;
  //   } else if (q4a4) {
  //     questionNumber++;
  //     LondonScore++;
  //     TokyoScore++;
  //     NZScore++;
  //     ParisScore++;
  //   }

  //   if(q5a1) {
  //     questionNumber++;
  //     LondonScore++;
  //     ParisScore++;
  //     PhuketScore++;
  //     BBScore++;
  //   } else if (q5a2) {
  //     questionNumber++;
  //     TokyoScore++;
  //     ParisScore++;
  //     PhuketScore++;
  //     BBScore++;
  //     NZScore++;
  //   } else if (q5a3) {
  //     questionNumber++;
  //     BBScore++;
  //     NZScore++;
  //     PhuketScore++;
  //     BanffScore++;
  //   } else if (q5a4) {
  //     questionNumber++;
  //     ParisScore++;
  //     LondonScore++;
  //     TokyoScore++;
  //     BBScore++;
  //     PhuketScore++;
  //   }

  //   if(q6a1) {
  //     questionNumber++;
  //     ParisScore++;
  //     LondonScore++;
  //     TokyoScore++;
  //   } else if (q6a2) {
  //     questionNumber++;
  //     BanffScore++;
  //     BBScore++;
  //   } else if (q6a3) {
  //     questionNumber++;
  //     PhuketScore++;
  //     LondonScore++;
  //     NZScore++;
  //   } else if (q6a4) {
  //     questionNumber++;
  //     LondonScore++;
  //     TokyoScore++;
  //   }

  //   // if(q7a1) {
  //   //   questionNumber++;

  //   // } else if (q7a2) {
  //   //   questionNumber++;

  //   // } else if (q7a3) {
  //   //   questionNumber++;
      
  //   // } else if (q7a4) {
  //   //   questionNumber++;
      
  //   // }
  //   console.log(questionNumber);
    
  //   var scores = [ParisScore, NZScore, BBScore, LondonScore, TokyoScore, PhuketScore, BanffScore];
    
  //   let firstmax = -1;
  //   for(let i = 0; i < scores.length; i++) {
  //     if (scores[i] > firstmax) {
  //       firstmax = scores[i];
  //     }
  //   }
    
  // }






  
  
