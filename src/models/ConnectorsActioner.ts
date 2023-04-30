import BaseActioner from './BaseActioner';

interface Connector {
	source: string;
	target: string;
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
		return this.connectors;
	}
}

export default class ConnectorsActioner extends BaseActioner<LazyConnectorsState> {
	static defaultValue: LazyConnectorsState = new LazyConnectorsState();

	protected getStyle(): LazyConnectorsState {
		switch (this.action.actionType) {
			case 'connect to':
				return this.additiveValueChange(this.action.actor,  this.action.target);
			default:
				return new LazyConnectorsState();
		}
	}

	private additiveValueChange(source: string, target: string): LazyConnectorsState {
		const result = new LazyConnectorsState();
		result.connectors.connectors = [{source, target}];
		return result;
	}
}
