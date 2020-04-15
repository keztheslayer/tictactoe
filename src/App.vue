<template>
    <div>
        <h1 v-if="winner">
            The winner is: {{ winner }}
        </h1>
        <div class="box">
            <cell 
                v-for="cell in cells"
                :key="cell.id"
                :disabled="cell.isChecked"
                :checked-by="cell.checkedBy"
                @click.native="go(cell.id)"
            />
        </div>
        <button
            v-if="gameOver"
            class="button"
            @click="restart"
        >
            Restart
        </button>
    </div>
</template>
<script>
import Cell from './components/Cell.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import combinations from './utils/combinations';

const maxSteps = 9;

export default {
    components : {
        Cell,
    },
    computed : {
        ...mapGetters( [
            'cells',
            'availableCells',
            'currentStep',
            'gameOver',
            'playerCheckedIDs',
            'AICheckedIDs',
            'winner',
        ] ),
    },
    methods : {
        ...mapActions( [
            'check',
            'nextStep',
        ] ),
        ...mapMutations( [
            'restart',
            'setWinner',
        ] ),
        go( cellId ) {
            if ( this.gameOver ) {
                return;
            }
            this.check( { 
                id     : cellId,
                author : 'player', 
            } );

            setTimeout( this.AIstep(), 1 );
            this.checkStatus();
        },
        AIstep() {
            if ( this.availableCells < 2 || this.gameOver ) {
                return;
            }
            
            const randomCell = Math.floor( Math.random() * this.availableCells.length );

            this.check( { 
                id     : this.availableCells[randomCell].id,
                author : 'AI', 
            } );
        },
        checkStatus() {
            combinations.forEach( combo => {
                if ( this.arrayContainsArray( this.playerCheckedIDs, combo ) ) {
                    this.$store.state.gameOver = true;
                    this.setWinner('Player');

                    return;
                }

                else if ( this.arrayContainsArray( this.AICheckedIDs, combo ) ) {
                    this.$store.state.gameOver = true;
                    this.setWinner('AI');
                }
            } );

            if ( this.currentStep > maxSteps && !this.winner ) {
                this.setWinner('Friendship!');
                this.$store.state.gameOver = true;
            }
        },
        arrayContainsArray( superset, subset ) {
            if ( subset.length === 0 ) {
                return false;
            }
            
            return subset.every( function( value ) {
                return ( superset.indexOf( value ) >= 0 );
            } );
        },
    },
}; 
</script>

<style lang="scss" scoped>

$bgcolor: #eee;
$hovered: darken($bgcolor, 10%);

.box {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    height: 600px;
}

.button{
  display: block;
  margin: 20px auto 0;
  zoom: 1;
  padding: 6px 20px;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  font: bold 13px arial, helvetica, sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #555;
  background-color: #ddd;
  background-image: linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  transition: background-color .2s ease-out;
  background-clip: padding-box;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  text-shadow: 0 1px 0 rgba(255,255,255, .9);
  user-select: none;
}

.button:hover{
  background-color: #eee;
  color: #555;
}

.button:active{
  background: #e9e9e9;
  position: relative;
  top: 1px;
  text-shadow: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}

</style>