<template>
    <button 
        :class="cellClass"
        :disabled="disabled"
    />
</template>
<script>

export default {
    props : {
        disabled : {
            type    : Boolean,
            default : false,
        },
        checkedBy : {
            type    : String,
            default : '',
        },
    },
    computed : {
        cellClass() {
            return `cell ${this.checkedByClass}`;
        },
        checkedByClass() {
            return this.checkedBy ? `cell cell__checked-by_${this.checkedBy}` : '';
        },
    },
};
</script>

<style lang="scss" scoped>
$bgcolor: #eee;
$hovered: darken($bgcolor, 10%);

.cell {
    width: 200px;
    height: 200px;
    position: relative;
    box-sizing: border-box;
    background: $bgcolor;
    border: 4px solid black;
    border-top: none;
    border-left: none;
    cursor: pointer;

    &:hover {
        background: $hovered;
    }

    &:nth-child(3n+1) {
        border-left: 4px solid black;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
        border-top: 4px solid black;
    }
    
    &:disabled {
        cursor: default;
        background: $hovered;
    }

    &__checked-by {
        &_player {
            &:before {
                content: 'X';
                color: black;
                font: bold 36px sans-serif;
            }
        }
        &_AI {
            &:before {
                content: 'O';
                color: black;
                font: bold 36px sans-serif;
            }
        }
    }
}
</style>