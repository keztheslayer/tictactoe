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
    </div>
</template>
<script>
import Cell from './components/Cell.vue';
import { mapGetters, mapActions } from 'vuex';
import combinations from './utils/combinations';

export default {
    components : {
        Cell,
    },
    data() {
        return {
            winner : '',
        };
    },
    computed : {
        ...mapGetters( [
            'cells',
            'availableCells',
            'currentStep',
            'gameOver',
            'playerCheckedIDs',
            'AICheckedIDs',
        ] ),
    },
    methods : {
        ...mapActions( [
            'check',
            'nextStep',
        ] ),
        go( cellId ) {
            if ( this.gameOver ) {
                return;
            }
            this.check( { 
                id     : cellId,
                author : 'player', 
            } );
            this.AIstep();
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
                if ( this.arrayContainsArray( this.AICheckedIDs, combo ) ) {
                    this.$store.state.gameOver = true;
                    this.winner = 'AI';
                }
                else if ( this.arrayContainsArray( this.playerCheckedIDs, combo ) ) {
                    this.$store.state.gameOver = true;
                    this.winner = 'Player';
                }
            } );
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
</style>