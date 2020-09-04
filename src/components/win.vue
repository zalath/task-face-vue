<template>
  <div
    :id="divid"
    :class="wintype"
    :style="style"
    v-hammer:pan="pan"
    v-hammer:panend="panend"
    v-hammer:tap="tap"
  >
    <div class="winbar d-flex">
      <div class="title p-2 flex-grow-1">{{title}}</div>
      <div class="barbtns">
        <button type="button" class="btn btn-primary" data-toggle="modal" v-hammer:tap="createEl">+</button>
      </div>
      <div v-if="pid != 0" class="barbtns">
        <a class="btn btn-danger" v-if="ismined==false" v-on:click="minimize">_</a>
        <a class="btn btn-danger" v-if="ismined==true" v-on:click="normalize">□</a>
        <a class="btn btn-danger" v-on:click="close">x</a>
      </div>
    </div>
    <div v-if="isShowTree">
      <template v-for="(el) in els">
        <el :el="el" :key="'w'+el.id"></el>
      </template>
    </div>
  </div>
</template>
<script>
import req from "../assets/req";
import poz from "../assets/poz";
import TweenLite from "gsap";
import el from "./el";
export default {
  name: "win",
  components: {
    el,
  },
  props: {
    type: String, //is fullscreen,full/win
    etype: String, //els's list's type
    pid: Number,
    title: String,
    mousepoz: { x: 0, y: 0 },
  },
  computed: {
    treeid() {
      if (this.pid == undefined) return 0;
      else return this.pid;
    },
    wintype() {
      var c = "";
      if (this.type == "win") {
        c = "container";
      }
      return "window " + this.type + " " + c;
    },
    style() {
      return {
        left: this.p.X + "px",
        top: this.p.Y + "px",
        zIndex: this.p.zIndex,
        width: this.p.W,
        border: this.border,
        overflow: "auto",
        filter: "blur(" + this.turnBlur + "px)",
      };
    },
    turnBlur: function () {
      return this.shadowBlur.toFixed(0);
    },
  },
  data: function () {
    return {
      els: [],
      p: {
        X: 0,
        Y: 0,
        zIndex: 1,
        pozX: 0,
        pozY: 0,
        W: "",
      },
      border: "solid 2px red",
      isShowTree: true,
      ismined: false,
      blur: 0,
      shadowBlur: 0,
      divid: "",
    };
  },
  watch: {
    blur: function (val) {
      // console.log(val)
      TweenLite.to(this.$data, { duration: 0.2, shadowBlur: val });
    },
  },
  created() {
    this.loadEls();
    this.$bus.on("showwin", this.show);
    this.$bus.emit("showwin", this.pid);
    if (this.type == "full") this.p.W = 100 + "%";
    if (this.pid != 0) this.setpoz();
    else this.divid = "masterdiv";

    this.$bus.on("create" + this.pid, this.newEl);
    this.$bus.on("delc" + this.pid, this.delc);
    this.$bus.on("moved", this.moved);
    this.$bus.on("blur", this.setBlur);
  },
  methods: {
    setBlur: function (val) {
      this.blur = val;
    },
    newEl: function (el) {
      this.els.push(el);
    },
    delc: function (el) {
      var i = this.els.map((item) => item.id).indexOf(el.id);
      this.els.splice(i, 1);
    },
    setpoz: function () {
      this.p.X += this.mousepoz.x;
      if (this.type != "full") {
        var div = $("#masterdiv")[0];
        this.p.W = poz.setWidth(div.clientWidth);
        this.p.X = poz.keepInWin(this.p.X, this.p.W, document.body.clientWidth);
        this.p.W = this.p.W + "px";
      }
      this.p.Y += this.mousepoz.y;
      this.panend();
    },
    moved: function (dat) {
      if (dat.npid == this.pid) {
        this.els.push(dat.el);
      }
      if (dat.opid == this.pid) {
        var i = this.els.map((item) => item.id).indexOf(dat.el.id);
        this.els.splice(i, 1);
      }
    },
    close: function () {
      this.$bus.emit("closewin", this.pid);
    },
    loadEls: function () {
      req.post(this.etype, { id: this.pid }).then((res) => {
        this.els = res.data;
      });
    },
    show: function (pid) {
      if (this.pid == pid) {
        this.p.zIndex = 12;
        // this.border = "solid 1px white"
        // setTimeout(() => {
        // this.border = "solid 1px red"
        // }, 200);
      } else this.p.zIndex = 11;
    },
    pan: function (e) {
      if (this.pid != 0) {
        this.p.Y = this.p.pozy + e.deltaY;
        this.p.X = this.p.pozx + e.deltaX;
      }
    },
    panend: function () {
      this.p.pozx = this.p.X;
      this.p.pozy = this.p.Y;
    },
    tap: function () {
      if (this.pid != 0) this.$bus.emit("showwin", this.pid);
    },
    minimize: function () {
      this.isShowTree = false;
      this.ismined = true;
    },
    normalize: function () {
      this.isShowTree = true;
      this.ismined = false;
    },
    createEl: function (e) {
      this.$bus.emit("newEl", { e: e, pid: 0 });
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
  padding: 10px;
  /* width:50%; */
}
.full {
  position: absolute;
  /* width:100%; */
  height: 100%;
  border: none;
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
  /* margin-right:-15px; */
}
</style>