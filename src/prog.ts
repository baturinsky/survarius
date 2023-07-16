type Wave = {
  /**number of units */
  n: number
  /**start pos */
  y: number
  x: number
  /**spawn time*/
  hp: number[]
  v: number
  a: number
  s: number
  /**last bullet type */
  g?: number
}


type Bullet = {
  y: number
  x: number
  v: number
  w: number
  /**bullet type */
  g: number
}

{
  let c: CanvasRenderingContext2D = C.getContext`2d`,
    bullets = [], kills = 5,
    charge = [0, 0, 0, 0, 0],
    guns = [[1, 0, 0], [7, .05, 0], [15, 3.1, 1.55], [15, .1, 3.14], [32, .2, 0]],
    waves: Wave[], rate: number[],
    dead: number, t: number, waveCharge: number,
    w: Wave, b: Bullet, x: number, y: number, n: number, s: number, v: number, h: number,
    i: number, g: string, a: number, r: number, at: XY,
    Rand = n => Math.random() * n,
    arc = (x: number, y: number, r: number) => {
      //@ts-ignore
      c.beginPath(c.fill(c.arc(x, y, r, 0, 7)));
    }, start = () => {
      rate = [kills / 5, 0, 0, 0, 0];
      waveCharge = x = y = t = kills = 0;
      waves = [];
    };

  start();

  C.width = innerWidth - 20;
  C.height = innerHeight - 20;
  onmousemove = e => ({ x, y } = e);

  setInterval(_ => {
    c.fillStyle = `#0002`;
    c.fillRect(0, 0, C.width, C.height);
    t++;

    c.fillStyle = "#0f0";
    arc(x, y, 9);

    waveCharge++;
    if (waveCharge > 300) {
      waveCharge = 0;
      i = Rand(1);
      n = ~~(Rand(3) + 4), h = 3 + (1.2 - i) * (kills + t ** 1.01 / 99);
      waves.unshift({
        n,
        s: Rand(40) + 40,
        v: i + .1,
        a: Rand(2) < 1 ? Rand(99) : 0,
        x: C.width,
        y: Rand(~~(C.height * .8)) + .1,
        hp: [...Array(n)].map(_ => h)
      })
    }

    for (g in rate) {
      charge[g] += rate[g];
      if (charge[g] > guns[g][0] * 69) {
        charge[g] = 0;
        [n, s, r] = guns[g];
        for (i = 0; i < n; i++) {
          a = i * s - s * (n - 1) / 2 + r;
          bullets.unshift({ g, x, y, v: Math.cos(a) * 2, w: Math.sin(a) * 2 })
        }
      }
    }

    for (b of bullets) {
      b.x += b.v;
      b.y += b.w;
      c.fillStyle = `hsl(${b.g * 99 + 60},99%,60%)`
      arc(b.x, b.y, 5);
    }

    c.fillStyle = "#f00";
    for (w of waves) if (w.hp) {
      dead = 1;
      w.x -= w.v;
      for (i in w.hp) {
        if (w.hp[i] < 0)
          continue;
        dead = 0;
        at = { x: w.x + i * w.s, y: w.y + Math.sin(t / 99) * w.a };
        r = w.hp[i] ** .7 + 9;
        arc(at.x, at.y, r);
        if (Math.hypot(x - at.x, y - at.y) < r + 5)
          start()
        for (b of bullets) {
          if (Math.hypot(b.x - at.x, b.y - at.y) < r + 5) {
            w.hp[i] -= 9;
            w.g = b.g
            b.x /= 0;
          }
        }
      }
      if (dead) {
        rate[(++w.g) % 4]++;
        //console.log(rate);
        kills++;
        charge[4] = waveCharge = 9999;
        w.hp = null;
      }
    }

    bullets.splice(299);
    waves.splice(30);
  }, 1 / 60)

}