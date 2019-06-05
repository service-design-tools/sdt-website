const filterValues = {
    "research": {
        "type": "when",
        "checked": false
    },
    "ideation": {
        "type": "when",
        "checked": false
    },
    "prototyping": {
        "type": "when",
        "checked": false
    },
    "implementation": {
        "type": "when",
        "checked": false
    },
    "experts": {
        "type": "who",
        "checked": false
    },
    "stakeholders": {
        "type": "who",
        "checked": false
    },
    "service-staff": {
        "type": "who",
        "checked": false
    },
    "users": {
        "type": "who",
        "checked": false
    },
    "context": {
        "type": "what",
        "checked": false
    },
    "system": {
        "type": "what",
        "checked": false
    },
    "experience": {
        "type": "what",
        "checked": false
    },
    "offering": {
        "type": "what",
        "checked": false
    },
    "text": {
        "type": "how",
        "checked": false
    },
    "maps": {
        "type": "how",
        "checked": false
    },
    "narratives": {
        "type": "how",
        "checked": false
    },
    "simulations": {
        "type": "how",
        "checked": false
    }
};

const sorting = "process";

const questions = [
    {
        "type": "when",
        "text": "for"
    }, {
        "type": "who",
        "text": "to engage"
    }, {
        "type": "what",
        "text": "to describe"
    }, {
        "type": "how",
        "text": "that use"
    }];

export {filterValues, sorting, questions};