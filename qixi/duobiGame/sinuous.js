SinuousWorld = new function() {
    var image = new Image();
    image.src= "in-love-white.png"  
    var inLoveRed = new Image();
    inLoveRed.src = "in-love-red-small.png"
    var inLoveGay = new Image();
    inLoveGay.src = "in-love-gay.png"    
    var dogImage = new Image()
    dogImage.src = "god1.png"
    var dogFoodImage = new Image()
    dogFoodImage.src = "dogfood.png"
    function j() {
        if (n == false) {
            playSound("MusicCalmARR");
            n = true;
            o = [];
            w = [];
            h = 0;  
            dogsMet = 0;
            coupleKilled = 0;          
            r = 1;
            A = I = J = K = 0;
            c.trail = [];
            c.position.x = y;
            c.position.y = z;
            c.shield = 0;
            s.style.display = "none";
            q.style.display = "block";
            // B.style.display = "none";
            C = (new Date).getTime()
        }
    }

    function t() {
        playSound("MusicIdleARR");
        playSound("fx_explosion");
        n = false;
        Q = (new Date).getTime() - C;
        Z();
        s.style.display = "block";
        h = Math.round(h);
        R.innerHTML = "<div class='prompt-ui-title'>汪汪汪。。嗷。。</div><br>" + 
                      "<div class='prompt-ui'>一路碰到<span style='color:green'>" + dogsMet + "</span>只单身狗<br>" + 
                      "一同拆散了<span style='color:green'>" + coupleKilled +  "</span>对儿情侣<br>" + 
                      "被第<span style='color:green'>" + h + "</span>对情侣秀瞎了双眼</div>";
            // scoreText = "遇到: <span>" + Math.round(h) + "</span>对";
            scoreText = "遇到<span>" + dogsMet + "</span>只单身狗；";
            
            scoreText += "拆散:<span>" + coupleKilled + "</span>对情侣"; 
            scoreText += " Time: <span>" + Math.round(((new Date).getTime() - C) / 1E3 * 10) / 10 + "s</span>";        
        // scoreText = "Score: <span>" + Math.round(h) + "</span>";
        // scoreText += " Time: <span>" + Math.round(((new Date).getTime() - C) / 1E3 * 100) / 100 + "s</span>" 
            // " : <span>" + coupleKilled + "</span>" +
        q.innerHTML = scoreText
        document.getElementById("startButton").innerHTML = "再来"
        var percent = Math.max(Math.min(Math.round(coupleKilled / 5), 99), 1)
        // document.title = "我拆散了"+coupleKilled +"对儿情侣，击败了全国" + percent + "%的单身狗。你也来试试？";
        document.title = "一路上有" + dogsMet + "只单身狗相助，一同击败了" + coupleKilled + "对Couples。荣登全国前" + (100 - percent) + "%单身狗！！！"

    }

    function $() {
        for (var a = g.length < 10, b = 0; b < g.length; b++)
            if (h > g[b].score) {
                a = true;
                break
            }
        if (a)
            if (!D.value || D.value == " ") alert("Name can not be empty.");
            else {
                aa();
                B.style.display = "none"
            }
    }

    function Z() {
        ajax.ghs(function(a) {
            if ((g = eval(a)) && n == false) {
                a = 1;
                for (var b = 0; b < g.length; b++) g[b].score > h && a++;
                if (a < 10) {
                    if (g.length > 1)
                        if (b = g.length >= 9 ? g.pop() : {}) {
                            b.name = "";
                            b.score = Math.round(h);
                            b.date = "";
                            newHighscoreData = g.slice(0,
                                a - 1);
                            newHighscoreData.push(b);
                            g = newHighscoreData = newHighscoreData.concat(g.slice(a - 1));
                            L()
                        }
                    S.innerHTML = "You made #" + a + " on the top list!";
                    B.style.display = "block"
                }
            }
        })
    }

    function ba() {
        ajax.ghs(function(a) {
            g = eval(a);
            L()
        })
    }

    function aa() {
        var a = D.value;
        ajax.shs(function(b) {
            g = eval(b);
            L()
        }, "n=" + a + "&s=" + h * h * 3.14159265 * Math.max(a.length, 1) + "&d=" + Math.round(Q / 1E3 * 100) / 100 + "&sc=" + sc + "&fc=" + Math.round(K) + "&fs=" + Math.round(J) + "&ms=" + Math.round(I) + "&cs=" + Math.round(A) + "&f=" + Math.round((M + N + u) / 3))
    }

    function L() {
        if (g) {
            for (var a =
                    "", b = 0; b < g.length; b++) {
                a += "<li>";
                a += '<span class="place">' + (b + 1) + ".</span>";
                a += '<span class="name">' + g[b].name + "</span>";
                a += '<span class="score">' + g[b].score + " p</span>";
                a += '<span class="date">' + g[b].date + "</span>";
                a += "</li>"
            }
            T.innerHTML = a
        }
    }

    function ca(a) {
        y = a.clientX - (window.innerWidth - m) * 0.5 - 16;
        z = a.clientY - (window.innerHeight - l) * 0.5 - 16
    }

    function da() {}

    function ea() {}

    function fa(a) {
        if (a.touches.length == 1) {
            a.preventDefault();
            y = a.touches[0].pageX - (window.innerWidth - m) * 0.5;
            z = a.touches[0].pageY - (window.innerHeight -
                l) * 0.5
        }
    }

    function ga(a) {
        if (a.touches.length == 1) {
            a.preventDefault();
            y = a.touches[0].pageX - (window.innerWidth - m) * 0.5 - 60;
            z = a.touches[0].pageY - (window.innerHeight - l) * 0.5 - 30
        }
    }

    function ha() {}

    function U() {
        m = v ? window.innerWidth : 900;
        l = v ? window.innerHeight : 550;
        k.width = m;
        k.height = l;
        var a = (window.innerWidth - m) * 0.5,
            b = (window.innerHeight - l) * 0.5;
        k.style.position = "absolute";
        k.style.left = a + "px";
        k.style.top = b + "px";
        if (v) {
            s.style.left = "0px";
            s.style.top = "0px";
            q.style.left = "0px";
            q.style.top = "0px"
        } else {
            s.style.left = a + 6 + "px";
            s.style.top = b + 200 + "px";
            q.style.left = a + 6 + "px";
            q.style.top = b + 6 + "px"
        }
        E.style.position = "absolute";
        E.style.left = a + "px";
        E.style.top = b - 20 + "px"
    }

    function F(a, b) {
        for (var d = 10 + Math.random() * 15; --d >= 0;) {
            var i = new Point;
            i.position.x = a.x + Math.sin(d) * b;
            i.position.y = a.y + Math.cos(d) * b;
            i.velocity = {
                x: -4 + Math.random() * 8,
                y: -4 + Math.random() * 8
            };
            i.alpha = 1;
            G.push(i)
        }
    }

    function V() {
        var a = (new Date).getTime();
        O++;
        if (a > P + 1E3) {
            u = Math.min(Math.round(O * 1E3 / (a - P)), x);
            M = Math.min(M, u);
            N = Math.max(N, u);
            P = a;
            O = 0
        }
        a = 0.01 + Math.max(Math.min(u,
            x), 0) / x * 0.99;
        a *= a;
        f.clearRect(0, 0, k.width, k.height);
        var b = {
                x: H.x * r,
                y: H.y * r
            },
            d, i;
        if (n) {
            r += 8.0E-4;
            pp = c.clonePosition();
            c.position.x += (y - c.position.x) * 0.14;
            c.position.y += (z - c.position.y) * 0.14;
            h += 0.4 * r * a;
            h += c.distanceTo(pp) * 0.1 * a;
            K++;
            J += 0.4 * r * a;
            I += c.distanceTo(pp) * 0.1 * a;
            c.shield = Math.max(c.shield - 1, 0);
            var special = false; 
            // console.log(c.shield)
            if (c.shield > 0 && (c.shield > 100 || c.shield % 3 != 0)) {
                // have shield
                special = true; 
                f.beginPath();
                
                f.fillStyle = "#ec5298";
                // if (special == true)
                



                // f.strokeStyle = "#00ffcc";
                f.arc(c.position.x, c.position.y, c.size * (Math.min(c.shield, 100) / 50), 0, Math.PI * 2, true);
                f.fill();
                f.stroke()
            }
            c.trail.push(new Point(c.position.x,c.position.y));
            f.beginPath();
            f.strokeStyle = "#Fc72B8";

            f.lineWidth = 2;
            d = 0;
            for (i = c.trail.length; d < i; d++) {
                p = c.trail[d];
                p2 = c.trail[d + 1];
                if (d == 0) f.moveTo(p.position.x, p.position.y);
                else p2 && f.quadraticCurveTo(p.position.x, p.position.y, p.position.x + (p2.position.x - p.position.x) / 2, p.position.y + (p2.position.y - p.position.y) / 2);
                p.position.x += b.x;
                p.position.y += b.y
                // f.strokeStyle = "#00ffcc";
                // f.arc(p.position.x, p.position.y, 30, 0, Math.PI * 2, true);                
            }
            f.stroke();
            f.closePath();
            c.trail.length > 60 && c.trail.shift();
            c.trail = []
            f.beginPath();
            if (!special) {
                // one dog
                f.drawImage(dogImage, p.position.x-15, p.position.y-15, 30,30)
            } else {
                // two dogs 
                f.drawImage(dogImage, p.position.x-22, p.position.y-22, 30,30)
                f.drawImage(dogImage, p.position.x-7, p.position.y-7, 30,30)
                // f.drawImage(dogFoodImage, p.position.x-20, p.position.y-20, 40,40)
            }
            
            // f.fillStyle = "#8ff1ff";
            f.arc(c.position.x, c.position.y, 0, 0, Math.PI * 2,
                true);
            f.fill()
        }
        if (n && (c.position.x < 0 || c.position.x > m || c.position.y < 0 || c.position.y > l)) {
            F(c.position, 10);
            t()
        }
        for (d = 0; d < o.length; d++) {
            p = o[d];
            if (n)
                // if the couple is killed
                if (c.shield > 0 && p.distanceTo(c.position) < (c.size * 4 + p.size) * 0.5) {
                    playSound("fx_break");
                    coupleKilled++
                    console.log("killed")
                    F(p.position, 30);
                    o.splice(d, 1);
                    d--;
                    h += 10 * a;
                    A += 10 * a;
                    continue
                } else if (p.distanceTo(c.position) < (c.size + p.size) * 0.5) {
                F(c.position, 10);
                t()
            }
            f.beginPath();
            // f.fillStyle = "#ff0000";


            // var pattern = f.createPattern(image); 
            // f.fillStyle = pattern; 

            f.arc(p.position.x, p.position.y, p.size / 2, 0, Math.PI * 2, true);
            if (p.color < 0.962) {
                f.drawImage(inLoveRed, p.position.x-15, p.position.y-15, 30,30)
            } else {
                f.drawImage(inLoveGay, p.position.x-15, p.position.y-15, 30,30)
            }
            
            // f.fill();
            p.position.x += b.x * p.force;
            p.position.y +=
                b.y * p.force;
            if (p.position.x < -p.size || p.position.y > l + p.size) {
                o.splice(d, 1);
                d--
            }
        }
        for (d = 0; d < w.length; d++) {
            p = w[d];
            if (p.distanceTo(c.position) < (c.size + p.size) * 0.5 && n) {
                playSound("MusicFunARR");
                playSound("fx_bubble");                
                c.shield = 300;
                dogsMet++
                for (i = 0; i < o.length; i++) {
                    e = o[i];
                    if (e.distanceTo(p.position) < 100) {
                        
                        playSound("fx_break");                        
                        F(e.position, 10);
                        o.splice(i, 1);
                        i--;
                        h += 10 * a;
                        A += 10 * a
                    }
                }
            }
            f.beginPath();
            // f.arc(p.position.x, p.position.y, 20, 0, Math.PI * 2, true);
            
                // f.beginPath();
                
                // f.fillStyle = "#fc62A8";
                // if (special == true)
                



                // f.strokeStyle = "#00ffcc";
                
            f.fill();
            f.drawImage(dogImage, p.position.x-15, p.position.y-15,30,30);

            f.stroke() 
                           
            // f.fillStyle = "#00ffcc";
            // f.arc(p.position.x, p.position.y, p.size / 2, 0, Math.PI * 2, true);
            // f.fill();
            p.position.x += b.x * p.force;
            p.position.y +=
                b.y * p.force;
            if (p.position.x < -p.size || p.position.y > l + p.size || c.shield != 0) {
                w.splice(d, 1);
                d--
            }
        }
        // console.log(Math.round(m*l/10000))
        o.length < enemyNumber * r && o.push(W(new Enemy));
        w.length < 1 && Math.random() > 0.9 && c.shield == 0 && w.push(W(new Shield));
        w.length < 1 && Math.random() > 0.9 && c.shield == 0 && w.push(W(new Timi));        
        c.shield == 1 && n && playSound("MusicCalmARR");

        // rendering the exploding effect
        for (d = 0; d < G.length; d++) {
            p = G[d];
            p.velocity.x += (b.x - p.velocity.x) * 0.04;
            p.velocity.y += (b.y - p.velocity.y) * 0.04;
            p.position.x += p.velocity.x * Math.random() * 2;
            p.position.y += p.velocity.y * Math.random() * 2;
            p.alpha -= 0.04;
            f.fillStyle = "rgba(255,255,255," + Math.max(p.alpha, 0) + ")";
            f.fillRect(p.position.x, p.position.y,
                3, 3);
            p.alpha <= 0 && G.splice(d, 1)
        }
        if (n) {
            // scoreText = "躲过: <span>" + Math.round(h) + "</span>对";
            scoreText = "遇到<span>" + dogsMet + "</span>只单身狗";            
            scoreText += "一同拆散<span>" + coupleKilled + "</span>对情侣"; 
            scoreText += " Time: <span>" + Math.round(((new Date).getTime() - C) / 1E3 * 10) / 10 + "s</span>";
            // scoreText += ' <p class="fps">FPS: <span>' + Math.round(u) + " (" + Math.round(Math.max(Math.min(u / x, x), 0) * 100) + "%)</span></p>";
            q.innerHTML = scoreText
        }
    }

    function W(a) {
        if (Math.random() > 0.5) {
            a.position.x = Math.random() * m;
            a.position.y = -20
        } else {
            a.position.x = m + 20;
            a.position.y = -l * 0.2 + Math.random() * l * 1.2
        }
        return a
    }
    var v = navigator.userAgent.toLowerCase().indexOf("android") !=
        -1 || navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipad") != -1,
        m = v ? window.innerWidth : 900,
        l = v ? window.innerHeight : 550,
        enemyNumber = Math.round(m*l/10000),
        x = 60,
        k, f, q, s, R, X, E, o = [],
        w = [],
        G = [],
        c, y = window.innerWidth - m,
        z = window.innerHeight - l,
        n = false,
        h = 0,
        C = (new Date).getTime(),
        Q = 0,
        r = 1,
        K = 0,
        J = 0,
        I = 0,
        A = 0,
        H = {
            x: -1.3,
            y: 1
        },
        u = 0,
        M = 1E3,
        N = 0,
        P = (new Date).getTime(),
        O = 0,
        g = [],
        coupleKilled = 0,
        T, B, D, Y, S;
    this.init = function() {
        k = document.getElementById("world");
        s = document.getElementById("panels");
        q = document.getElementById("status");
        document.getElementById("message");
        R = document.getElementById("title");
        X = document.getElementById("startButton");
        E = document.getElementById("seeMore");
        document.getElementById("highscoreList");
        T = document.getElementById("highscoreOutput");
        B = document.getElementById("highscoreWin");
        D = document.getElementById("highscoreInput");
        Y = document.getElementById("highscoreSubmit");
        S = document.getElementById("highscorePlace");
        if (k && k.getContext) {
            f = k.getContext("2d");
            document.addEventListener("mousemove", ca, false);
            document.addEventListener("mousedown",
                da, false);
            document.addEventListener("mouseup", ea, false);
            k.addEventListener("touchstart", fa, false);
            document.addEventListener("touchmove", ga, false);
            document.addEventListener("touchend", ha, false);
            window.addEventListener("resize", U, false);
            X.addEventListener("click", j, false);
            // Y.addEventListener("click", $, false);
            c = new Player;
            U();
            if (v) {
                document.getElementById("sharing").style.display = "none";
                document.getElementById("panel").style.display = "none";
                q.style.width = m + "px";
                k.style.border = "none";
                H.x *= 2;
                H.y *= 2;
                setInterval(V,
                    1E3 / 30)
            } else setInterval(V, 1E3 / x);
            ba();
            v || swfobject.embedSWF("swf/sound.swf", "sound", "1", "1", "9.0.0", "", {}, {
                allowScriptAccess: "always"
            }, {
                id: "soundSWF"
            })
        }
    };
    ajax = {
        ghs: function(a) {
            // var b = new XMLHttpRequest;
            // parameters = "m=ghs";
            // b.open("POST", "highscore.php", true);
            // b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // if (b) {
            //     b.onreadystatechange = function() {
            //         b.readyState == 4 && b.status == 200 && a(b.responseText)
            //     };
            //     b.send(parameters)
            // }
        },
        shs: function(a, b) {
            var d = new XMLHttpRequest;
            b += "&m=shs";
            if (d) {
                d.open("POST",
                    "highscore.php", true);
                d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                d.onreadystatechange = function() {
                    d.readyState == 4 && d.status == 200 && a(d.responseText)
                };
                d.send(b)
            }
        }
    }
};

function Point(j, t) {
    this.position = {
        x: j,
        y: t
    }
}
Point.prototype.distanceTo = function(j) {
    var t = j.x - this.position.x;
    j = j.y - this.position.y;
    return Math.sqrt(t * t + j * j)
};
Point.prototype.clonePosition = function() {
    return {
        x: this.position.x,
        y: this.position.y
    }
};

function Player() {
    this.position = {
        x: 0,
        y: 0
    };
    this.trail = [];
    this.size = 30;
    this.shield = 0
}
Player.prototype = new Point;

function Enemy() {
    this.position = {
        x: 0,
        y: 0
    };
    this.size = 25
    this.color = Math.random()
    // this.size = 6 + Math.random() * 4;
    this.force = 1 + Math.random() * 0.4
}
Enemy.prototype = new Point;

function Shield() {
    this.position = {
        x: 0,
        y: 0
    };
    this.size = 10 + Math.random() * 8;
    this.force = 1 + Math.random() * 0.4
}
function Timi() {
    this.position = {
        x: 0,
        y: 0
    };
    this.size = 10 + Math.random() * 8;
    this.force = 1 + Math.random() * 0.4
}
Shield.prototype = new Point;
Timi.prototype = new Point;
SinuousWorld.init();

function sendToJavaScript(j) {
    j == "SoundController ready and loaded!" && playSound("MusicIdleARR")
}

function playSound(j) {
    // navigator.userAgent.toLowerCase().indexOf("android") != -1 || navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipad") != -1 || document.getElementById("soundSWF").sendToActionScript(j)
};

function showSharingPage () {
    document.getElementById("share_pic").style.visibility= "visible"
    // $('#share_pic').show();
}
function hideSharingPage () {
    document.getElementById("share_pic").style.visibility="hidden"
        // $('#share_pic').hide();
}