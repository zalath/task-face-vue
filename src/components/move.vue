<template>
  <div class="window win container" :style="style" v-hammer:pan="pan" v-hammer:panend="panend">
    <div class="winbar d-flex">
      <div class="barbtns">
        <a class="btn btn-danger" v-on:click="toTop()">^</a>
        <a class="btn btn-danger" v-on:click="cancel()">x</a>
      </div>
    </div>
  </div>
</template>
<script>
import req from "../assets/req";
import poz from "../assets/poz";
export default {
  name: "dele",
  data: function () {
    return {
      el: "",
      p: {
        X: 10,
        Y: 10,
        zIndex: 23,
        pozX: 10,
        pozY: 10,
        W: 100,
        display: "none",
      },
      Width: "",
      border: "solid 2px red",
      mousepoz: { x: 0, y: 0 },
    };
  },
  computed: {
    style() {
      return {
        left: this.p.X + "px",
        display: this.p.display,
        top: this.p.Y + "px",
        zIndex: this.p.zIndex,
        width: this.p.Width,
        border: this.border,
      };
    },
  },
  created() {
    this.$bus.on("tomove", this.moving);
    this.$bus.on("move", this.moved);
  },
  methods: {
    moving: function (dat) {
      this.mousepoz = dat.e.center;
      this.setpoz();
      this.p.display = "block";
      this.el = JSON.parse(JSON.stringify(dat.el));
    },
    setpoz: function () {
      this.p.X = this.mousepoz.x;
      // var div = $('#masterdiv')[0]
      this.p.X = poz.keepInWin(this.p.X, this.p.W, document.body.clientWidth);
      this.p.Width = this.p.W + "px";
      this.p.Y = this.mousepoz.y;
      this.panend();
    },
    moved: function (pid) {
      req.post("move", { id: this.el.id, npid: pid }).then((res) => {
        if (res.data == "done") {
          // console.log('---------------------------------')
          // console.log('moved:'+pid+'<-'+this.el.id)
          this.p.display = "none";
          this.$bus.emit("moved", {
            npid: pid,
            el: this.el,
            opid: this.el.pid,
          });
        } else {
          this.$bus.emit("movecancel");
        }
      });
    },
    cancel() {
      this.$bus.emit("movecancel");
      this.el = "";
      this.p.display = "none";
    },
    pan: function (e) {
      this.p.Y = this.p.pozY + e.deltaY;
      this.p.X = this.p.pozX + e.deltaX;
    },
    panend: function () {
      this.p.pozX = this.p.X;
      this.p.pozY = this.p.Y;
    },
    toTop() {
      this.$bus.emit("move", 0);
    },
  },
};
</script>
<style scoped>
.window {
  background-color: black;
  color: white;
  opacity: 0.9;
}
.win {
  position: absolute;
  /* width:50%; */
}
.winbar {
  width: 100% !important;
  background-color: black;
  cursor: pointer;
}
.title {
  color: white;
}
.barbtns {
  margin-right: -15px;
}
</style>