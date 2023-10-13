import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GameEngine } from '../game/game-engine';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: true,
	imports: [IonicModule],
})
export class HomePage implements AfterViewInit, OnDestroy {
	constructor(private gameEngine: GameEngine) {}

	ngAfterViewInit(): void {
		// load level config first
		setTimeout(() => {
			this.gameEngine.start();
		}, 1000);
	}

	ngOnDestroy(): void {
		this.gameEngine.destroy();
	}
}
