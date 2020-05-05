/**
 * Created by trshelto on 3/30/16.
 */

gsap.set('.image', { scale: 0, opacity: 0 });

var gameBoard = document.querySelector('.gameBoard');
var dropTargets = document.querySelectorAll('.target');
var totalHits = dropTargets.length;
var hits = 0;

var timeLine = gsap.timeline();

function init() {
  timeLine.from('.title', {
    duration: 0.5,
    scale: 50,
    opacity: 0,
  });
}

function loadGameboard() {
  timeLine.to('.image', {
    stagger: 0.06,
    opacity: 1,
    scale: 1,
    ease: 'back.out(1)',
    onComplete: initDraggable,
  });
}

function displayWin() {
  gsap.to('.modal', {
    duration: 1,
    autoAlpha: 1,
  });
}

function initDraggable() {
  Draggable.create(
    '.dragItem',
    {
      bounds: gameBoard,
      edgeResistance: 0.3,
      onPress: function (e) {
        this.ID = this.target.id;

        this.startX = this.x;
        this.startY = this.y;
        this.startOffsetTop = this.target.offsetTop;
        this.startOffsetLeft = this.target.offsetLeft;
      },
      onDragEnd: function (e) {
        dropTargets.forEach(
          function (target) {
            if (`${this.target.id}Drop` == target.id) {
              //start id match
              if (this.hitTest(target, '10%')) {
                var left = target.offsetLeft - this.startOffsetLeft;
                var top = target.offsetTop - this.startOffsetTop;

                gsap.to([target, this.target], {
                  autoAlpha: 0,
                  duration: 0.5,
                });

                gsap.to(this.target, {
                  x: left,
                  y: top,
                });
                hits += 1;

                if (hits == totalHits) {
                  displayWin();
                } else {
                  gsap.to('.correct', {
                    autoAlpha: 1,
                    onComplete: function () {
                      gsap.to('.correct', {
                        delay: 0.5,
                        autoAlpha: 0,
                      });
                    },
                  });
                }
              } else {
                gsap.to('.tryAgain', {
                  autoAlpha: 1,
                  onComplete: function () {
                    gsap.to('.tryAgain', {
                      delay: 0.5,
                      autoAlpha: 0,
                    });
                  },
                });

                gsap.to(this.target, {
                  x: this.startX,
                  y: this.startY,
                });
              }
              //end id match
            }
          }.bind(this)
        );
      },
    },
    0.1
  );
}
init();
loadGameboard();
