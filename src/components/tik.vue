<template>
  <div
    class="window win container-fluid"
    :style="style"
    v-hammer:pan="pan"
    v-hammer:panend="panend"
  >
    <div class="winbar d-flex">
      <!-- <div class="title p-2 flex-grow-1"></div> -->
      <div class="barbtns">
        <a
          class="btn btn-primary tik"
          style="background-color: lightgray !important"
          v-on:click="tik(1)"
        ></a>
        <a
          class="btn btn-primary tik"
          style="background-color: green !important"
          v-on:click="tik(0)"
        ></a>
        <a
          class="btn btn-primary tik"
          style="background-color: red !important"
          v-on:click="tik(2)"
        ></a>
        <a class="btn btn-danger" v-on:click="cancel()">x</a>
      </div>
    </div>
    <div>
      <!-- body -->
    </div>
  </div>
</template>
<script>
import req from "../assets/req";
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
        W: 250 + "px",
        display: "none",
      },
      border: "solid 1px red",
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
        width: this.p.W,
        border: this.border,
      };
    },
  },
  created() {
    this.$bus.on("totik", this.totik);
  },
  methods: {
    totik: function (dat) {
      this.el = dat.el;
      this.p.display = "block";
      this.mousepoz = dat.e.center;
      this.setpoz();
    },
    setpoz: function () {
      this.p.X = this.mousepoz.x;
      this.p.Y = this.mousepoz.y;
      this.p.pozX = this.mousepoz.x;
      this.p.pozY = this.mousepoz.y;
    },
    tik: function (tik) {
      req.post("tik", { id: this.el.id, tik: tik }).then((res) => {
        if (res.data == "done") {
          this.p.display = "none";
          this.$bus.emit("tik" + this.el.id, tik);
        } else {
          this.p.display = "none";
        }
      });
    },
    cancel() {
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
  padding: 0px;
  /* width:50%; */
}
.winbar {
  width: 100% !important;
  background-color: black;
  cursor: pointer;
}
.barbtns a {
  height: 37px;
  width: 62px;
}
.title {
  color: white;
}
.barbtns {
  margin-right: -15px;
}
</style>