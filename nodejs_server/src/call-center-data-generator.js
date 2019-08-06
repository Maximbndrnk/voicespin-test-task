const INTERVAL_DURATION = 2000;

module.exports = {
    subscribe: (cb) => {
        setInterval(() => {
            cb(getData());
        }, INTERVAL_DURATION);
        cb(getData());
    }
};

const AGENTS = [
    'Roger',
    'Jasmin',
    'German',
    'Dottie',
    'Leonida',
    'Julio',
    'Tari',  
    'Mohammed',  
    'Elissa',  
    'Annamae',  
    'Lonny',  
    'Wilfredo',  
    'Karyn',  
    'Gilberte',  
    'Yolande',  
    'Ossie',  
    'Kathey',  
    'Sheron',  
    'Georgiann',
    'Bibi'
];

const AGENT_STATUSES = {
    IDLE: 'IDLE',
    IN_CALL: 'IN CALL',
    PAUSED: 'PAUSED',
};

const CALL_STATUSES = {
    WAITING: 'WAITING',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
};

let agents = getInitialAgents();
let calls = [];

function getData() {
    agents = getNormalizedAgents(agents);
    calls = getNormalizedCalls(calls);
    return {
        agents,
        calls,
    };
}

function getInitialAgents() {
    const INITIAL_AMOUNT_OF_AGENTS = Math.round(Math.random() * AGENTS.length / 2);
    return (new Array(INITIAL_AMOUNT_OF_AGENTS).fill(null, 0, INITIAL_AMOUNT_OF_AGENTS)).map(getRandomAgent);
}

function getRandomAgent() {
    return {
        name: AGENTS[Math.round(Math.random() * (AGENTS.length - 1))],
        status: AGENT_STATUSES.IDLE,
        number: `38077000${String(Math.round(Math.random() * 1000)).padStart(4, '0')}`
    };
}

function getRandomCall() {
    return {
        type: Math.round(Math.random()) ? 'IN' : 'OUT',
        status: CALL_STATUSES.WAITING,
        callerNumber: `38077000${String(Math.round(Math.random() * 1000)).padStart(4, '0')}`,
        callingNumber: `38077000${String(Math.round(Math.random() * 1000)).padStart(4, '0')}`
    };
}

function getNormalizedAgents(agents) {
    let amountOfAgents = Math.round(Math.random() * 2);
    let deleteAgents = Math.round(Math.random());

    for (let i = 0; i < amountOfAgents; i++) {
        if (deleteAgents) {
            agents.splice(Math.round(Math.random() * agents.length), deleteAgents);
        } else {
            agents.splice(Math.round(Math.random() * agents.length), deleteAgents, getRandomAgent());
        }
    }

    return agents.map((agent) => {
        let needToChangeStatus = Math.round(Math.random());

        if (!needToChangeStatus) {
            return agent;
        }

        if (agent.status === AGENT_STATUSES.PAUSED) {
            agent.status = AGENT_STATUSES.IDLE;
        } else {
            agent.status = Math.round(Math.random()) ? AGENT_STATUSES.PAUSED : AGENT_STATUSES.IN_CALL;
        }

        return agent;
    });
}

function getNormalizedCalls(calls) {
    let shouldCreateCalls = Math.round(Math.random());
    let amountOfCalls = Math.round(Math.random() * 2);
    let newCalls = [];

    if (shouldCreateCalls) {
        for (let i = 0; i < amountOfCalls; i++) {
            newCalls.push(getRandomCall());
        }
    }

    return calls.map((call) => {
        let needToChangeStatus = Math.round(Math.random());

        if (!needToChangeStatus) {
            return call;
        }

        if (call.status === CALL_STATUSES.WAITING) {
            call.status = CALL_STATUSES.ACTIVE;
        } else {
            call.status = CALL_STATUSES.COMPLETED;
        }

        return call;
    }).concat(newCalls);
}
