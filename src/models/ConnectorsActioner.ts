import BaseActioner from './BaseActioner';
import { ConnectAction } from './Subtitles';

interface Connector {
	action: ConnectAction,
	frameRange: [number, number];
}

export interface ConnectorStates {
	connectors: Connector[];
}

class LazyConnectorsState {
	connectors: ConnectorStates = {connectors: []};

	combine(prev: LazyConnectorsState): LazyConnectorsState {
		const result = new LazyConnectorsState();
		result.connectors.connectors = [...prev.connectors.connectors, ...this.connectors.connectors];
		return result;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getConnectors(adjustedFrame: number, fps: number): ConnectorStates {
		return {connectors: this.connectors.connectors.filter((connector) => connector.frameRange[0] <= adjustedFrame && connector.frameRange[1] >= adjustedFrame)};
	}
}

export default class ConnectorsActioner extends BaseActioner<LazyConnectorsState> {
	static defaultValue: LazyConnectorsState = new LazyConnectorsState();

	protected getStyle(): LazyConnectorsState {
		switch (this.action.actionType) {
			case 'connect to':
				return this.additiveValueChange(this.action);
			default:
				return new LazyConnectorsState();
		}
	}

	private additiveValueChange(action: ConnectAction): LazyConnectorsState {
		const result = new LazyConnectorsState();
		result.connectors.connectors = [{action, frameRange: this.frameRange}];
		return result;
	}
}
