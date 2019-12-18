new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {

            //this.playerAttack(3, 10);
            var damage = this.calcDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player 1 hits Chemical Turtle for ' + damage
            });
            this.monsterAttack();

        },
        specialAttack: function() {
            //this.playerAttack(10, 20);
            var damage = this.calcDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player 1 lands a critical hit on the Chemical Turtle for ' + damage 
            });
            
            if (this.checkWin()){
                return;
            } 
            this.monsterAttack(); 
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            
            this.turns.unshift({
                isPlayer: true,
                text: 'Player 1 heals for 10'
            });

            this.monsterAttack();
        },
        giveUp: function() {
            this.turns.unshift({
                isPlayer: true,
                text: 'Loser !'
            });
            this.gameIsRunning = false;
            
        },
        /*playerAttack: function(x, y) {
            this.monsterHealth -= this.calcDamage(x, y);
            
            if (this.checkWin()){
                return;
            }
            
        }, */
        monsterAttack: function() {
            var damage = this.calcDamage(5, 15);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Chemical Turtle hits Player 1 for ' + damage
            });
            this.checkWin();
        },

        calcDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won ! New games ?' )) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost ! New games ?' )) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }

        
    }
});