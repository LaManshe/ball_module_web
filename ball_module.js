import GUI from './modules/lil-gui.module.min.js';
export default class Ball{
    /**
     * Конструктор объявления класса мяча
     * @param {string} canvaSelector Селектор канваса, который добавлен в HTML
     * @param {string} ballPath Путь до объекта мяча в формате .glb
     * @param {bool} IsRotate Должен ли вращаться мяч?
     * @param {float} RotateSpeed Скорость вращения
     * @param {hex} BallColor Цвет мяча в формате 0х(hex)
     */
    constructor(canvaSelector, ballPath, IsRotate = false, RotateSpeed = 0.001, BallColor = 0xffffff){
        //#region Consts
        this.R_ISALPHA     = true;
        this.R_ISANTIALIAS = true;
        this.R_PIXELRATIO  = 1.5;

        this.CAM_POS_X  = 1;
        this.CAM_POS_Y  = 0;
        this.CAM_POS_Z  = 1;
        this.CAM_LOOK_X = 0;
        this.CAM_LOOK_Y = 0;
        this.CAM_LOOK_Z = 0;
        this.CAMFOV     = 60;

        this.L_COLOR       = 0xffffff;
        this.L_GROUNDCOLOR = 0xB97A20;
        this.L_INTENSITY   = 1;

        this.BALL_USERSPEEDROTATE_DESC = 0.01;
        this.BALL_USERSPEEDROTATE_MOB = 0.01;

        this.BDG_TRANSPARENT = true;

        this.STR_BALLNAME         = "Soccer_Ball_2";
        this.STR_PATHDEFAULTIMAGE = "./badges/default.png"
        //#endregion

        this.canva_container = document.querySelector(canvaSelector);
        this.Scene           = new Scene();
        this.Camera          = new Camera(this.canva_container, this.CAMFOV, this.CAM_POS_X, this.CAM_POS_Y, this.CAM_POS_Z, this.CAM_LOOK_X, this.CAM_LOOK_Y, this.CAM_LOOK_Z);
        this.Render          = new Render(this.R_ISALPHA, this.R_ISANTIALIAS, this.R_PIXELRATIO, this.canva_container);
        this.Light           = new Light(this.L_COLOR, this.L_GROUNDCOLOR, this.L_INTENSITY);
        this.LoadController  = new ObjectLoadController();
        this.Light.set(this.Scene.entity);

        this.IsRotate    = IsRotate;
        this.RotateSpeed = RotateSpeed;
        this.BallColor   = BallColor;
        this.BallPath    = ballPath;
        this.BallShape   = undefined;
        this.Ball        = undefined;
        this.Badges      = [];

        this.loadBall(this.BallPath);

        setTimeout(() => {
            this.gui();
        }, 1000);
        
    }

    gui(){
        const gui = new GUI();

        const folderBall = gui.addFolder( 'Ball' );
        const colorFormats = {
            colorBall: '#ffffff',
            int: 0xffffff,
            object: { r: 1, g: 1, b: 1 },
            array: [ 1, 1, 1 ]
        };
        var balObj = {
            isAutoRotate: true,
            speedRotate: 0.001,
        }
        
        folderBall.addColor( colorFormats, 'colorBall' ).onChange(value => {
            var color = new THREE.Color(value);
            this.setBallColor(color);
        });
        folderBall.add(balObj, "isAutoRotate").onChange(value => {
            this.IsRotate = value;
        });
        folderBall.add(balObj, "speedRotate", 0, 1, 0.001).onChange(value => {
            this.RotateSpeed = value;
        });;

        var obj = {
            Add_badge_1: () => { this.setBadge("badge_1", "./badges/default.png"); },
            Add_badge_2: () => { this.setBadge("badge_2", "./badges/default.png"); },
            Add_badge_3: () => { this.setBadge("badge_3", "./badges/default.png"); },
            Add_badge_4: () => { this.setBadge("badge_4", "./badges/default.png"); },
            Add_badge_5: () => { this.setBadge("badge_5", "./badges/default.png"); },
            Add_badge_6: () => { this.setBadge("badge_6", "./badges/default.png"); },
            Add_badge_7: () => { this.setBadge("badge_7", "./badges/default.png"); },
            Add_badge_8: () => { this.setBadge("badge_8", "./badges/default.png"); },
            Add_badge_9: () => { this.setBadge("badge_9", "./badges/default.png"); },
            Add_badge_10: () => { this.setBadge("badge_10", "./badges/default.png"); },
            Add_badge_11: () => { this.setBadge("badge_11", "./badges/default.png"); },
            Add_badge_12: () => { this.setBadge("badge_12", "./badges/default.png"); },
            Del_badge_1: () => { this.setBadge("badge_1"); },
            Del_badge_2: () => { this.setBadge("badge_2"); },
            Del_badge_3: () => { this.setBadge("badge_3"); },
            Del_badge_4: () => { this.setBadge("badge_4"); },
            Del_badge_5: () => { this.setBadge("badge_5"); },
            Del_badge_6: () => { this.setBadge("badge_6"); },
            Del_badge_7: () => { this.setBadge("badge_7"); },
            Del_badge_8: () => { this.setBadge("badge_8"); },
            Del_badge_9: () => { this.setBadge("badge_9"); },
            Del_badge_10: () => { this.setBadge("badge_10"); },
            Del_badge_11: () => { this.setBadge("badge_11"); },
            Del_badge_12: () => { this.setBadge("badge_12"); },
        }

        const folder = gui.addFolder( 'Badges' );
        folder.add(obj, 'Add_badge_1');
        folder.add(obj, 'Add_badge_2');
        folder.add(obj, 'Add_badge_3');
        folder.add(obj, 'Add_badge_4');
        folder.add(obj, 'Add_badge_5');
        folder.add(obj, 'Add_badge_6');
        folder.add(obj, 'Add_badge_7');
        folder.add(obj, 'Add_badge_8');
        folder.add(obj, 'Add_badge_9');
        folder.add(obj, 'Add_badge_10');
        folder.add(obj, 'Add_badge_11');
        folder.add(obj, 'Add_badge_12');

        folder.add(obj, 'Del_badge_1');
        folder.add(obj, 'Del_badge_2');
        folder.add(obj, 'Del_badge_3');
        folder.add(obj, 'Del_badge_4');
        folder.add(obj, 'Del_badge_5');
        folder.add(obj, 'Del_badge_6');
        folder.add(obj, 'Del_badge_7');
        folder.add(obj, 'Del_badge_8');
        folder.add(obj, 'Del_badge_9');
        folder.add(obj, 'Del_badge_10');
        folder.add(obj, 'Del_badge_11');
        folder.add(obj, 'Del_badge_12');

        const light = gui.addFolder( 'Light' );
        var lightObj = {
            light_intensity: 1
        }

        light.add(lightObj, 'light_intensity', -5, +5, 0.1 ).onChange(value => {
            this.Light.light.intensity = value;
        });
        const colorLight = {
            color_light: '#ffffff',
            int: 0xffffff,
            object: { r: 1, g: 1, b: 1 },
            array: [ 1, 1, 1 ]
        };
        light.addColor( colorLight, 'color_light' ).onChange(value => {
            var color = new THREE.Color(value);
            this.Light.light.color = color;
        });
    }

    loadBall(url){
        let lf_ball = this.LoadController.load(url);

        Promise.all([lf_ball]).then(() => {
            this.LoadController.Scenes.forEach((item) => {
                this.Scene.entity.add(item.scene);
                this.Ball = item.scene;
            });

            this.Ball.children.forEach((badge) => {
                if(badge.name != this.STR_BALLNAME){
                    badge.visible = false;
                    this.Badges.push(new Badge(badge.name, badge, badge.visible));
                }
                else if(badge.name == this.STR_BALLNAME){
                    this.BallShape = badge;

                    this.BallShape.material.color = new THREE.Color(this.BallColor);
                }
            });
            this.initEvents();
            this.render();
        });
    }

    /**
     * Показать бэйдж
     * @param {string} name Имя бэйджа (badge_1, badge_2, ..., badge_12)
     * @param {string} img Путь до картинки бэйджа
     */
    setBadge(name, img){
        var badge = this.Badges.find(el => el.Name == name);

        badge.show(img);
    }

    /**
     * Скрыть бэйдж
     * @param {string} name Имя бэйджа (badge_1, badge_2, ..., badge_12)
     */
    deleteBadge(name){
        var badge = this.Badges.find(el => el.Name == name);

        badge.hide();
    }

    /**
     * Установить цвет мяча
     * @param {hex} color Цвет мяча в формате 0х(hex)
     */
    setBallColor(color){
        this.BallColor = color;
        this.BallShape.material.color = new THREE.Color(this.BallColor);
    }

    /**
     * Получить список бэйджей
     * @returns array
     */
    getBadges(){
        return this.Badges;
    }

    /**
     * Вызвать когда происходит изменения размера страницы
     */
    resize(){
        this.Camera.resize(this.canva_container.offsetWidth, this.canva_container.offsetHeight);
        this.Render.resize(this.canva_container.offsetWidth, this.canva_container.offsetHeight);
    }

    initEvents(){
        this.canva_container.addEventListener('mousedown', (e) => {
            var x = event.clientX;
            var y = event.clientY;
            this.vec_mouse = new THREE.Vector2(( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1);
            this.mouseDown = true;
        });
        this.canva_container.addEventListener('mouseup', (e) => {
            this.mouseDown = false;
        });
        this.canva_container.addEventListener('mousemove', (e) => {
            if(!this.mouseDown) return;
            var x = event.clientX;
            var y = event.clientY;

            var deltaX = (( x / window.innerWidth ) * 2 - 1) - this.vec_mouse.x;

            if(deltaX > 0){
                this.Ball.rotateY(this.BALL_USERSPEEDROTATE_DESC);
            }
            else if(deltaX < 0){
                this.Ball.rotateY(-this.BALL_USERSPEEDROTATE_DESC);
            }
            else{
                return;
            }
            
            this.vec_mouse = new THREE.Vector2(( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1);
        });

        let eventy = null;

        this.canva_container.addEventListener("touchstart", (e) => {
            eventy = e;
        });
        this.canva_container.addEventListener("touchmove", (e) => {
            if (eventy){
                var deltaTouchX = e.touches[0].pageX - eventy.touches[0].pageX;
                if(deltaTouchX > 0){
                    this.Ball.rotateY(this.BALL_USERSPEEDROTATE_MOB);
                    eventy = e;
                }
                else if(deltaTouchX < 0){
                    this.Ball.rotateY(-this.BALL_USERSPEEDROTATE_MOB);
                    eventy = e;
                }
                else{
                    return;
                }
            }
        });
        this.canva_container.addEventListener("touched", (e) => {
            eventy = null;
        });
    }

    render(){
        this.Render.render(this.Scene.entity, this.Camera.entity);
        if(this.Ball && this.IsRotate)
            this.Ball.rotateY(this.RotateSpeed);
        requestAnimationFrame(this.render.bind(this));
    }
}

class Scene{
    constructor(){
        this.entity = new THREE.Scene();
    }
}

class Camera{
    constructor(canva, fov, cam_pos_x, cam_pos_y, cam_pos_z, cam_look_x, cam_look_y, cam_look_z){
        this.entity = new THREE.PerspectiveCamera(fov, canva.offsetWidth / canva.offsetHeight, 0.1, 1000);

        this.entity.up.set(0, 1, 0);
        this.entity.position.set(cam_pos_x, cam_pos_y, cam_pos_z);
        this.entity.lookAt(cam_look_x, cam_look_y, cam_look_z);
    }

    resize(width, height){
        this.entity.aspect = width / height;
        this.entity.updateProjectionMatrix();
    }
}

class Render{
    constructor(isAlpha, isAntialias, devicePixelRatio, canva){
        this.entity = new THREE.WebGLRenderer({
            alpha: isAlpha,
            antialias: isAntialias,
            canvas: canva.children[0]
        });
        
        this.entity.outputEncoding = THREE.sRGBEncoding;
        this.entity.setPixelRatio(devicePixelRatio);
        
        this.entity.setSize(canva.offsetWidth, canva.offsetHeight);
    }

    render(scene, camera){
        this.entity.render(scene, camera);
    }

    resize(width, height){
        this.entity.setSize(width, height);
    }
}

class Light{
    constructor(color, groundColor, intensity){
        this.color = color; 
        this.groundColor = groundColor;  
        this.intensity = intensity;
        this.light = new THREE.DirectionalLight(this.color, this.intensity);

        this.light.position.set(6.14, 5.96, 7.2);
        this.light.target.position.set(0, 0, 0);
    }

    set(scene){
        scene.add(this.light);
    }
}

class ObjectLoadController{
    constructor(){
        this.GLTFLoader = new THREE.GLTFLoader();

        this.Objects = [];
        this.Scenes = [];
    }

    load(url){
        var me = this;

        let load = new Promise((resolve, reject) => {
            this.GLTFLoader.load(url, function (gltf){
                gltf.scene.traverse(function (child){
                    me.Objects.push(child);
                });
                me.Scenes.push(gltf);
                
                resolve();
            });
            
        });
        
        return load;
    }
}

class Badge{
    constructor(name, object, visible){
        this.Name    = name;
        this.Object  = object;
        this.Visible = visible;

        this.ImagePath = this.STR_PATHDEFAULTIMAGE;
    }

    show(img){
        var textureloader = new THREE.TextureLoader();
        var maptxt = textureloader.load(img);
        maptxt.flipY = false;

        var my_material = new THREE.MeshBasicMaterial({map: maptxt, transparent : this.BDG_TRANSPARENT});
        this.Object.material = my_material;
        this.Object.visible = true;
        this.Visible = true;
    }

    hide(){
        this.Object.visible = false;
        this.Visible = false;
    }
}