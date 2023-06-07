import { Subtitle } from './models/Subtitles';

export const productDeveloperSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 6, text: 'Product Developers: who are they and why are they on the rise?', translations: {
		zhCN: '何谓产品开发者? 为什么说他们正在崛起？',
		zhTW: '何謂產品開發者？為什麼說他們正在崛起？',
		ja: 'プロダクトデベロッパーとは何か？なぜ彼らが台頭しているのか？',
	}, actions:[
		{ actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 1.5, 0] },
		{ actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 0, 5] },
		{ actor: "title", actionType: "appear", startDuration: 0, endingTimeAdjustment: 6, endDuration: 1 },
		{ actor: "title", actionType: "additive value change to", duration: 6, value: 90},
		{ actor: "title-shadow", actionType: "additive value change to", duration: 0, value: -30},
		{ actor: "title-shadow", actionType: "additive value change to", duration: 6, value: -90},
		{ actor: 'mask', actionType: 'appear', startDuration: 0, endingTimeAdjustment: 6 },
		{ actor: 'product developer1', actionType: 'disappear', startDuration: 1, offset: 3 },
		{ actor: 'product developer2', actionType: 'disappear', startDuration: 1, offset: 4 },
	] },
	{ leadingBlank: 1, duration: 6, text: 'Picture this: a company delivering services to its users to fulfill their needs.', translations: {
		zhCN: '想象一下：一家公司向其用户提供服务，以满足他们的需求。',
		zhTW: '想像一下：一家公司向其用戶提供服務，以滿足他們的需求。',
		ja: 'こんなことを想像してみてください。ユーザーのニーズを満たすために、サービスを提供する会社があります。',
	}, actions:[
		{ actor: 'value to customer', actionType: 'appear', startDuration: 1 },
		{ actor: "company service", actionType: "connect to", startDuration: 1, target: "user", bentLevel: -30, strokeWidth: 5 },
		{ actor: 'worried-mom', actionType: 'disappear', startDuration: 2, offset: 3 },
		{ actor: 'happy-mom', actionType: 'appear', startDuration: 2, offset: 3 },
		{ actor: 'happy-mom', actionType: 'glow', duration: 2, offset: 4 },
	] },
	{ leadingBlank: 1, duration: 6, text: 'And in return? Customers provide the fuel for the company to grow - resources like money.	', translations: {
		zhCN: '作为回报？客户为公司提供了成长的动力-像金钱这样的资源。',
		zhTW: '作為回報？客戶為公司提供了成長的動力-像金錢這樣的資源。',
		ja: 'その見返りに、顧客は会社の成長のための燃料を提供します。お金のようなリソースです。',
	}, actions: [
		{ actor: 'value from customer', actionType: 'appear', startDuration: 1 },
		{ actor: "customer", actionType: "connect to", startDuration: 1, target: "company receiver", bentLevel: -70, strokeWidth: 5 },
		{ actor: 'company', actionType: 'glow', duration: 2, offset: 3 },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Software products often play a crucial role in providing services.', translations: {
		zhCN: '软件产品在提供服务方面通常起着至关重要的作用。',
		zhTW: '軟體產品在提供服務方面通常起著至關重要的作用。',
		ja: 'ソフトウェア製品は、サービス提供において重要な役割を果たすことが多いです。',
	}, actions:[
		{ actor: 'product', actionType: 'rotate and rise', duration: 1, value: 4 },
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 4, totalRotation: [0, 360 + 15, 0] },
	] },
	{ leadingBlank: 1, duration: 5, text: 'But traditionally, businesses have been focused on their core domain, not software. ', translations: {
		zhCN: '但是传统上，企业专注于其核心领域，而不是软件。',
		zhTW: '但是傳統上，企業專注於其核心領域，而不是軟體。',
		ja: 'しかし、伝統的には、企業はソフトウェアではなく、コアドメインに焦点を当ててきました。',
	}, actions: [
		{ actor: 'business person', actionType: 'appear', startDuration: 1 },
	] },
	{ leadingBlank: 1, duration: 4, text: 'In the past, developers were commonly external.', translations: {
		zhCN: '过去，开发者来自外部是很普遍的。',
		zhTW: '過去，開發者來自外部是很普遍的。',
		ja: '過去、開発者は外部の人が多かったです。',
	}, actions:[
		{ actor: 'stage', actionType: 'move', duration: 1, absolutePosition: [350, 0] },
		{ actor: "camera", actionType: "move", duration: 1, absolutePosition: [-1, 0, 5] },
		{ actor: 'external developers', actionType: 'appear', startDuration: 2, offset: 1 },
	] },
	{ leadingBlank: 1, duration: 8, text: 'Regardless, they were involved in traditional projects, with tasks split by technology rather than user needs, aiming for pre-determined deliverables.', translations: {
		zhCN: '无论内外，他们是以传统项目的形式工作，任务是按技术而不是用户需求划分的，目标是预先确定的可交付品。',
		zhTW: '無論內外，他們是以傳統項目的形式工作，任務是按技術而不是用戶需求劃分的，目標是預先確定的可交付品。',
		ja: '内外に関わらず、彼らは従来のプロジェクトに関わっていました。タスクはユーザーのニーズではなく、技術によって分割され、事前に決められた成果物を目指していました。',
	}, actions:[
		{ actor: 'internal developers', actionType: 'appear', startDuration: 2, offset: 0 },
		{ actor: 'cylinder', actionType: 'scale', outputRange: [0, 1], duration: 3, offset: 2 },
		{ actor: 'hex', actionType: 'scale', outputRange: [0, 1], duration: 3, offset: 2 },
		{ actor: 'month1', actionType: 'appear', startDuration: 1, offset: 2 },
		{ actor: 'month2', actionType: 'appear', startDuration: 1, offset: 4 },
		{ actor: 'month3', actionType: 'appear', startDuration: 1, offset: 5.5 },
		{ actor: 'month4', actionType: 'appear', startDuration: 1, offset: 6.5 },
	] },
	{ leadingBlank: 1, duration: 6, text: 'Integration was seen as a simple phase but often led to unexpected complications.', translations: {
		zhCN: '集成被视为一个简单的阶段，但往往会导致意想不到的复杂性。',
		zhTW: '整合被視為一個簡單的階段，但往往會導致意想不到的複雜性。',
		ja: '統合は単純なフェーズと見なされていましたが、予期しない複雑さを引き起こすことが多かったです。',
	}, actions: [
		{ actor: 'hex', actionType: '3d rotate', totalRotation: [-120, 0, -90], endingTimeAdjustment: 3, offset: 2 },
		{ actor: "hex", actionType: "move", duration: 3, absolutePosition: [1.5, 1.1, -0.3], offset: 2 },
		{ actor: 'cylinder', actionType: '3d rotate', totalRotation: [-120, 0, -90], endingTimeAdjustment: 3, offset: 2 },
		{ actor: "cylinder", actionType: "move", duration: 3, absolutePosition: [0, -2.1, -0.2], offset: 2},
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 360 + 15 + 90, 0], offset: 4 },
		{ actor: "hex", actionType: "move", duration: .5, absolutePosition: [1.0, 1.1, -0.3], offset: 5 },
		{ actor: "cylinder", actionType: "move", duration: .5, absolutePosition: [-0.5, -2.1, -0.2], offset: 5 },
		{ actor: "hex", actionType: "move", duration: .5, absolutePosition: [1.5, 1.1, -0.3], offset: 5.5 },
		{ actor: "cylinder", actionType: "move", duration: .5, absolutePosition: [0, -2.1, -0.2], offset: 5.5 },

	]},
	{ leadingBlank: 1, duration: 7, text: 'But now, more businesses are adopting a product-centric strategy, aiming to grow their competitive edge.', translations: {
		zhCN: '但现在，越来越多的企业正在采用以产品为中心的策略，旨在增强其竞争优势。',
		zhTW: '但現在，越來越多的企業正在採用以產品為中心的策略，旨在增強其競爭優勢。',
		ja: 'しかし、今では、より多くの企業が製品中心の戦略を採用し、競争力を高めようとしています。',
	}, actions: [
		{ actor: 'hex', actionType: 'disappear', startDuration: 0.1 },
		{ actor: 'cylinder', actionType: 'disappear', startDuration: 0.1 },
		{ actor: 'stage', actionType: 'move', duration: 2, absolutePosition: [0, 0], },
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 360 -10, 0], offset: 3 },
		{ actor: 'product', actionType: 'move', duration: 2, absolutePosition: [0, 0.9, 0], offset: 3 },

	]},
	{ leadingBlank: 1, duration: 5, text: 'This has sparked the rise of Product Developers.', translations: {
		zhCN: '于是也就有了产品开发者的崛起。',
		zhTW: '於是也就有了產品開發者的崛起。',
		ja: 'これが製品開発者の台頭を引き起こしました。',
	}, actions: [
		{ actor: 'external developers', actionType: 'move', duration: 2, absolutePosition: [280, -125, 0] },
		{ actor: 'external developers', actionType: 'scale', duration: 2, outputRange: [1, 0.8] },
		{ actor: 'developers2', actionType: 'move', duration: 1, absolutePosition: [-9, -15, 0], offset: 2, },
		{ actor: 'developers2', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 180, 0], offset: 3 },
		{ actor: 'manager1', actionType: 'move', duration: 1, absolutePosition: [130, 15, 0], offset: 2, },
		{ actor: 'developers1', actionType: 'move', duration: 1, absolutePosition: [-40, 0, 0], offset: 2, },
		{ actor: 'developers1', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 180, 0], offset: 3 },

	]},
	{ leadingBlank: 1, duration: 3.5, text: 'A Product Owner sets the direction for development.', translations: {
		zhCN: '产品负责人(Product Onwer)为开发制定方向。',
		zhTW: '產品負責人(Product Onwer)為開發制定方向。',
		ja: '製品オーナーは開発の方向性を決定します。',
	}, actions: [
		{ actor: 'product owner', actionType: 'appear', startDuration: 1, offset: 2 },
	]},
	{ leadingBlank: 1, duration: 6.5, text: `Yet, instead of solely relying on the PO's explanation, Product Developers engage directly with 'requirement donors',`, translations: {
		zhCN: '然而，产品开发者不仅仅依靠PO的解释，而是直接与“需求捐赠者”接触，',
		zhTW: '然而，產品開發者不僅僅依靠PO的解釋，而是直接與“需求捐贈者”接觸，',
		ja: 'しかし、POの説明に頼るだけでなく、製品開発者は直接「要件提供者」と関わります。',
	}, actions: [
		{ actor: 'donor cap', actionType: 'appear', startDuration: 1, offset: 2 },
		{ actor: "pd team1", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 3, target: "donor edge", bentLevel: -30, strokeWidth: 2, offset: 3},
		{ actor: "pd team2", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 3, target: "donor edge", bentLevel: -30, strokeWidth: 2, offset: 3},
	]},
	{ leadingBlank: 1, duration: 8, text: `a term for those who've convinced the Product Owner to invest in their product hypothesis.`, translations: {
		zhCN: '所谓“需求捐赠者“是指那些说服了产品负责人投资于他们的产品假设的人。',
		zhTW: '所謂“需求捐贈者“是指那些說服了產品負責人投資於他們的產品假設的人。',
		ja: '「要件提供者」とは、製品オーナーに彼らの製品仮説に投資するよう説得した人のことです。',
	}, actions: [
		{ actor: 'mask', actionType: 'appear', startDuration: 1, endingTimeAdjustment: 8 },
		{ actor: 'connectors', actionType: 'disappear', startDuration: 1, endingTimeAdjustment: 8 },
		{ actor: 'donor explainer', actionType: 'appear', startDuration: 1, endingTimeAdjustment: 8 },
		{ actor: 'aha', actionType: 'appear', startDuration: 1, endingTimeAdjustment: 5, offset: 3 },

	]},
	{ leadingBlank: 1, duration: 8, text: `These donors could be customers, users, product managers, or even developers, etc.	`, translations: {
		zhCN: '这些捐赠者可以是客户，用户，产品经理，甚至是开发者等。',
		zhTW: '這些捐贈者可以是客戶，用戶，產品經理，甚至是開發者等。',
		ja: 'これらの要件提供者は、顧客、ユーザー、プロダクトマネージャー、開発者などになります。',
	}, actions: [
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [230, 150, 0] },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [1, 0.6] },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 0 },
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [180, 380, 0], offset: 2 },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [0.6, 0.4], offset: 2 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 2 },
		{ actor: 'donor cap', actionType: 'move', duration: 0.5, absolutePosition: [180, 460, 0], offset: 3 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 0.5, totalRotation: [0, 0, -20], offset: 3 },
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [-530, 780, 0], offset: 4 },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [0.4, 0.3], offset: 4 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 4 },
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [-1330, 1080, 0], offset: 6 },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [0.4, 0.3], offset: 6 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 6 },
	]},
	{ leadingBlank: 1, duration: 3, text: 'Regardless who is the requirement donor, ', translations: {
		zhCN: '无论是谁提出的需求，',
		zhTW: '無論是誰提出的需求，',
		ja: '要件提供者が誰であれ、',
	},
	},
	{ leadingBlank: 0, duration: 6, text: 'Product Developers operate with a customer-centric focus, constantly checking in with reality and seeking early feedback.', translations: {
		zhCN: '产品开发者以客户为中心，不断进行现实检查并寻求早期反馈。',
		zhTW: '產品開發者以客戶為中心，不斷進行現實檢查並尋求早期反饋。',
		ja: '製品開発者は顧客を中心に据え、現実を常にチェックし、早期のフィードバックを求めます。',
	}, actions: [
		{ actor: 'donor cap', actionType: 'disappear', startDuration: 2},
		{ actor: 'gift product', actionType: 'appear', startDuration: 1, endDuration: 4, endingTimeAdjustment: 6 },
		{ actor: 'gift product', actionType: 'move', duration: 4, absolutePosition: [350, 0, 0], offset: 2 },

	]},
	{ leadingBlank: 1, duration: 6, text: 'They also maintain a view of the whole product, avoiding local optimization to foster sustainable product growth.', translations: {
		zhCN: '他们还保持对整个产品的视角，避免局部优化以促进产品可持续增长。',
		zhTW: '他們還保持對整個產品的視角，避免局部優化以促進產品可持續增長。',
		ja: 'また、製品全体の視点を維持し、持続的な製品の成長を促進するために、ローカルな最適化を避けます。',
	}, actions: [

		{ actor: "watering", actionType: "3d animation start", duration: 4, percentage: 100, speed: 1 },
	]},
	{ leadingBlank: 1, duration: 5, text: `So, who are the Product Developers? They work in a customer-centric, whole-product-focused way.`, translations: {
		zhCN: '那么，产品开发者是谁？他们以客户为中心，关注整个产品。',
		zhTW: '那麼，產品開發者是誰？他們以客戶為中心，關注整個產品。',
		ja: 'では、製品開発者とは誰でしょうか？彼らは顧客を中心に据え、製品全体に焦点を当てています。',
	}, actions: [
		{ actor: 'mask', actionType: 'appear', startDuration: 1 },
		{ actor: 'connectors', actionType: 'disappear', startDuration: 1 },
		{ actor: 'conclusion', actionType: 'appear', startDuration: 1 },
	]},
	{ leadingBlank: 1, duration: 5, text: `They are guided by the PO but collaborate directly with 'requirement donors' on product hypothes.`, translations: {
		zhCN: '他们与“需求捐赠者”直接合作，进行产品假设的实现与验证。',
		zhTW: '他們與“需求捐贈者”直接合作，進行產品假設的實現與驗證。',
		ja: '彼らはPOによって導かれますが、製品の仮説について「要件提供者」と直接協力します。',
	}, actions: [
	]},
	{ leadingBlank: 1, duration: 6, text: `Why are they on the rise? It reflects a pivotal shift in business strategy towards a product-centric model.`, translations: {
		zhCN: '为什么他们会崛起？这反映了商业战略向以产品为中心的模式的重大转变。',
		zhTW: '為什麼他們會崛起？這反映了商業戰略向以產品為中心的模式的重大轉變。',
		ja: 'なぜ彼らが台頭しているのでしょうか？それは、製品を中心としたビジネス戦略への転換を反映しています。',
	}, actions: [

	]},
	{ leadingBlank: 1, duration: 4, text: `Now that's a transformation worth watching.`, translations: {
		zhCN: '这,才是真正值得期待的转变。',
		zhTW: '這,才是真正值得期待的轉變。',
		ja: 'これこそが、見る価値のある変革です。',
	}, actions: [

	]},
	{ leadingBlank: 1, duration: 10, text: `Thank you for watching. I'm excited to share more about how the Product Developers work in future videos. Stay tuned.`, translations: {
		zhCN: '谢谢观看。我很期待在未来的视频中分享有关产品开发者如何工作的更多信息。敬请关注。',
		zhTW: '謝謝觀看。我很期待在未來的視頻中分享有關產品開發者如何工作的更多信息。敬請關注。',
		ja: 'ご視聴ありがとうございました。今後のビデオで、製品開発者がどのように働いているかについて、さらに詳しく説明します。お楽しみに。',
	}, actions: [

	]},
];
