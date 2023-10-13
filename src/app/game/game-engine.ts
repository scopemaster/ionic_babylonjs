// import { OimoJSPlugin } from '@babylonjs/core';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import { GameEnum } from './game-enum';

export class GameEngine {
	public engine: any;
	public canvas: any;
	public scene: any;
	public rollingAverage: any;
	public camera: any;

	protected resizeCanvas(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	protected resizeEngine(): void {
		this.resizeCanvas();
		this.engine.resize();
	}

	protected createScene(): void {
		this.canvas = document.getElementById(GameEnum.GAME_CANVAS_NAME) as HTMLCanvasElement;
		this.resizeCanvas();

		this.engine = new Engine(this.canvas, true, {
			preserveDrawingBuffer: true,
			stencil: true,
		});

		this.engine.hideLoadingUI();

		this.scene = new Scene(this.engine);
		this.scene.clearColor = Color4.FromHexString('#e2e2e2');

		// OIMO Physics Engine
		// const physEngine = new OimoJSPlugin(true, 10, OIMO);
		// this.scene.enablePhysics(new Vector3(0, GameEnum.GRAVITY, 0), physEngine);
		// this.scene.getPhysicsEngine().setTimeStep(60.0 / 1000.0);

		this.scene.registerBeforeRender(() => {
			// Alternatively, you can use this to animate you models
		});
	}

	protected renderLoop(): void {
		if (this.scene) {
			this.scene.render();
		}
	}

	protected startRenderLoop(): void {
		this.engine.runRenderLoop(this.renderLoop.bind(this));
	}

	protected stopRenderLoop(): void {
		this.engine.stopRenderLoop();
	}

	protected update(): void {
		this.startRenderLoop();
		window.addEventListener('resize', this.resizeEngine.bind(this));
	}

	public start(): void {
		this.createScene();
		this.update();
	}

	public destroy(): void {
		window.removeEventListener('resize', this.resizeEngine.bind(this));
		if (this.engine) {
			this.engine.dispose();
		}
	}
}
