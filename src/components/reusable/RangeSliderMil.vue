<template>
    <div class="trackMil-container">
        <!-- <span class="range-value min">{{ minValue }} // {{ minimum }}</span> <span class="range-value max">{{ maxValue }}</span> -->
        <div class="trackMil" ref="_vpcTrackMil"></div>
        <div class="trackMil-highlight" ref="trackMilHighlight"></div>
        <button class="trackMil-btn trackMil1" ref="trackMil1"></button>
        <button class="trackMil-btn trackMil2" ref="trackMil2"></button>
        <!-- {{ minVal }}ssd
        {{ minimum }} -->
    </div>

    <!-- <input type="range" min="0" max="100" step="5" value="20,50,80" /> -->

    <!-- <div>
        <div class="slider">
            <div class="progress"></div>
        </div>
        <div class="range-input">
            <input type="range" class="range-min" min="0" max="10000" value="2500" step="100" />
            <input type="range" class="range-max" min="0" max="10000" value="7500" step="100" />
        </div>
    </div> -->
</template>

<script>
// import {  } from 'vue';
export default {
    name: 'PriceRangeSlider',
    emits: ['setMinimum', 'setMaximum'],
    props: {
        trackMilHeight: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return {
            min: 100,
            max: 2000000,
            minValue: 0,
            maxValue: 2000000,
            step: 1000,
            totalSteps: 0,
            percentPerStep: 1,
            trackMilWidth: null,
            isDragging: false,
            pos: {
                curTrackMil: null,
            },
            minVal: 0,
        };
    },

    methods: {
        moveTrackMil(trackMil, ev) {
            let percentInPx = this.getPercentInPx();

            let trackMilX = Math.round(this.$refs._vpcTrackMil.getBoundingClientRect().left);
            let clientX = ev.clientX;
            let moveDiff = clientX - trackMilX;

            let moveInPct = moveDiff / percentInPx;
            // console.log(moveInPct)

            if (moveInPct < 1 || moveInPct > 100) return;
            let value = Math.round(moveInPct / this.percentPerStep) * this.step + this.min;
            if (trackMil === 'trackMil1') {
                if (value >= this.maxValue - this.step) return;
                this.minValue = value;
            }

            if (trackMil === 'trackMil2') {
                if (value <= this.minValue + this.step) return;
                this.maxValue = value;
            }

            this.$refs[trackMil].style.left = moveInPct + '%';
            this.setTrackMilHightlight();
        },
        mousedown(ev, trackMil) {
            if (this.isDragging) return;
            this.isDragging = true;
            this.pos.curTrackMil = trackMil;
        },

        touchstart(ev, trackMil) {
            this.mousedown(ev, trackMil);
        },

        mouseup(ev, trackMil) {
            if (!this.isDragging) return;
            this.isDragging = false;
        },

        touchend(ev, trackMil) {
            this.mouseup(ev, trackMil);
        },

        mousemove(ev, trackMil) {
            if (!this.isDragging) return;
            this.moveTrackMil(trackMil, ev);
        },

        touchmove(ev, trackMil) {
            this.mousemove(ev.changedTouches[0], trackMil);
        },

        valueToPercent(value) {
            return ((value - this.min) / this.step) * this.percentPerStep;
        },

        setTrackMilHightlight() {
            this.$refs.trackMilHighlight.style.left = this.valueToPercent(this.minValue) + '%';
            this.$refs.trackMilHighlight.style.width = this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue) + '%';
        },

        getPercentInPx() {
            let trackMilWidth = this.$refs._vpcTrackMil.offsetWidth;
            let oneStepInPx = trackMilWidth / this.totalSteps;
            // 1 percent in px
            let percentInPx = oneStepInPx / this.percentPerStep;

            return percentInPx;
        },

        setClickMove(ev) {
            let trackMil1Left = this.$refs.trackMil1.getBoundingClientRect().left;
            let trackMil2Left = this.$refs.trackMil2.getBoundingClientRect().left;
            // console.log('trackMil1Left', trackMil1Left)
            if (ev.clientX < trackMil1Left) {
                this.moveTrackMil('trackMil1', ev);
            } else if (ev.clientX - trackMil1Left < trackMil2Left - ev.clientX) {
                this.moveTrackMil('trackMil1', ev);
            } else {
                this.moveTrackMil('trackMil2', ev);
            }
        },
    },
    watch: {
        // whenever question changes, this function will run
        minValue: function (newValue) {
            this.$emit('setMinimum', newValue);
        },
        maxValue: function (newValue) {
            this.$emit('setMaximum', newValue);
        },
    },

    mounted() {
        // calc per step value
        this.totalSteps = (this.max - this.min) / this.step;

        // percent the trackMil button to be moved on each step
        this.percentPerStep = 100 / this.totalSteps;
        // console.log('percentPerStep', this.percentPerStep)

        // set trackMil1 initilal
        document.querySelector('.trackMil1').style.left = this.valueToPercent(this.minValue) + '%';
        // trackMil2 initial position
        document.querySelector('.trackMil2').style.left = this.valueToPercent(this.maxValue) + '%';
        // set initila trackMil highlight
        this.setTrackMilHightlight();

        var self = this;

        ['mouseup', 'mousemove'].forEach((type) => {
            document.body.addEventListener(type, (ev) => {
                // ev.preventDefault();
                if (self.isDragging && self.pos.curTrackMil) {
                    self[type](ev, self.pos.curTrackMil);
                }
            });
        });

        ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach((type) => {
            document.querySelector('.trackMil1').addEventListener(type, (ev) => {
                ev.stopPropagation();
                self[type](ev, 'trackMil1');
            });

            document.querySelector('.trackMil2').addEventListener(type, (ev) => {
                ev.stopPropagation();
                self[type](ev, 'trackMil2');
            });
        });

        // on trackMil clik
        // determine direction based on click proximity
        // determine percent to move based on trackMil.clientX - click.clientX
        document.querySelector('.trackMil').addEventListener('click', function (ev) {
            ev.stopPropagation();
            self.setClickMove(ev);
        });

        document.querySelector('.trackMil-highlight').addEventListener('click', function (ev) {
            ev.stopPropagation();
            self.setClickMove(ev);
        });
    },
};
</script>

<style>
.range-value {
    position: absolute;
    top: -2rem;
}
.range-value.min {
    left: 0;
}

.range-value.max {
    right: 0;
}
.trackMil-container {
    width: 100%;
    position: relative;
    cursor: pointer;
    height: 0.5rem;
}

.trackMil,
.trackMil-highlight {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
}

.trackMil {
    background: #ddd;
}

.trackMil-highlight {
    /* background-color: black; */
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);
    border-radius: 12px;
    z-index: 2;
}

.trackMil-btn {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    cursor: pointer;
    display: block;
    position: absolute;
    z-index: 2;
    width: 1.5rem;
    height: 1.5rem;
    top: calc(-50% - 6px);
    margin-left: -1rem;
    border: none;
    /* background-color: black; */
    border-radius: 50%;
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);

    -ms-touch-action: pan-x;
    touch-action: pan-x;
    transition: box-shadow 0.3s ease-out, background-color 0.3s ease, -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, background-color 0.3s ease;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, background-color 0.3s ease, -webkit-transform 0.3s ease-out;
}
</style>
