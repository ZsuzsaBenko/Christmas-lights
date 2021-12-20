class ChristmasLights {
    LIGHT_NUMBER = 63;
    COLORS = [
        '#ffd000', '#e30000', '#4f2aa3', '#8f00a8', '#c90658', '#005dc7', '#ab0048', '#efff12', '#940000', '#2c5191'
    ];
    lights = [];
    bst = {};

    initChristmasLights() {
        this.decorate();
        this.createBST();
        this.switchOnLights();
        setInterval(() => this.switchOnLights(), 3000);
    }

    decorate() {
        const lightsDiv = document.querySelector('.lights');
        for (let i = 1; i <= this.LIGHT_NUMBER; i++) {
            this.lights.push(i);
            const light = document.createElement('span');
            light.classList.add('light');
            light.setAttribute('id', `light${i}`);
            light.innerHTML = '&#9733;';
            lightsDiv.appendChild(light);
        }
    }

    createBST() {
        this.bst = this.createNode(this.lights);
        const nodes = [this.bst];
        while (0 < nodes.length) {
            const currentNode = nodes[0];
            if (0 < currentNode.leftSubTreeElements.length) {
                const leftNode = this.createNode(currentNode.leftSubTreeElements);
                currentNode.left = leftNode;
                nodes.push(leftNode);
            } else {
                currentNode.left = undefined;
            }

            if (0 < currentNode.rightSubTreeElements.length) {
                const rightNode = this.createNode(currentNode.rightSubTreeElements);
                currentNode.right = rightNode;
                nodes.push(rightNode);
            } else {
                currentNode.right = undefined;
            }
            nodes.shift();
        }
    }

    createNode(arr) {
        const middle = arr[Math.floor(arr.length / 2)];
        const middleIndex = arr.indexOf(middle);
        return {
            root: middle,
            left: undefined,
            right: undefined,
            leftSubTreeElements: arr.slice(0, middleIndex),
            rightSubTreeElements: arr.slice(middleIndex + 1)
        };
    }

    switchOnLights() {
        this.switchOffLights();
        const lightsToSwitchOn = this.createLightsPath();
        const color = this.getRandomElement(this.COLORS);
        for (let i = 0; i < lightsToSwitchOn.length; i++) {
            setTimeout(() => {
                const lightSpan = document.getElementById(`light${lightsToSwitchOn[i]}`);
                lightSpan.classList.add('on');
                lightSpan.style.color = color;
            }, 200 * i);
        }
    }

    createLightsPath() {
        const start = this.getRandomElement(this.lights);
        const end = this.getRandomElement(this.lights);

        const visitedToStart = this.search(start);
        const endIndex = visitedToStart.indexOf(end);
        if (-1 < endIndex) {
            return visitedToStart.reverse().slice(0, endIndex + 1);
        }

        const visitedToEnd = this.search(end);
        const startIndex = visitedToEnd.indexOf(start);
        if (-1 < startIndex) {
            return visitedToEnd.slice(startIndex);
        }

        const common = visitedToStart.filter(num => visitedToEnd.includes(num));
        const deepestCommon = common[common.length - 1];

        const path = [];
        const reversedVisitedToStart = visitedToStart.reverse();
        path.push(...reversedVisitedToStart.slice(0, reversedVisitedToStart.indexOf(deepestCommon)));
        path.push(...visitedToEnd.slice(visitedToEnd.indexOf(deepestCommon)));
        return path;
    }

    search(value) {
        const visitedRoots = [this.bst.root];
        let currentNode = this.bst;
        while (currentNode.root !== value) {
            currentNode = value < currentNode.root ? currentNode.left : currentNode.right;
            visitedRoots.push(currentNode.root);
        }
        return visitedRoots;
    }

    switchOffLights() {
        const lightSpans = document.querySelectorAll('.light.on');
        lightSpans.forEach(span => {
            span.classList.remove('on');
            span.style.color = 'white';
        });
    }

    getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

const christmasLights = new ChristmasLights();
christmasLights.initChristmasLights()
