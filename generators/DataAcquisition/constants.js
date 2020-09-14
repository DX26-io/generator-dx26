const CONFLUENT_KAFKA = 'ck';
const VANILLA_KAFKA = 'vk';
const KINESIS = 'ki';
const PUBSUB = 'ps';

const AVRO = 'application/*+avro';
const JSON = 'application/json';

class InputOutputConfigDefaults {
    constructor() {
        this.destination = '';
        this.contentType = '';
        this.binder = '';
    }
}

class ProcessorConfigDefaults {
    constructor() {
        this.processorName = '';
        this.input = new InputOutputConfigDefaults();
        this.output = new InputOutputConfigDefaults();
    }
}

const Constants = {
    add: 'add',
    edit: 'edit',
    consume: 'consume',
    produce: 'produce',
    confluentKafka: 'ck',
    vanillaKafka: 'vk',
    kinesis: 'ki',
    pubsub: 'ps',
    avro: 'Avro',
    json: 'JSON',
    avroContentType: AVRO,
    jsonContentType: JSON,
    avroContentTypeClass: 'GenericRecord',
    jsonContentTypeClass: 'Any',
    messagingSystemsSupported: [
        {
            value: CONFLUENT_KAFKA,
            name: 'Confluent Kafka',
        },
        {
            value: VANILLA_KAFKA,
            name: 'Vanilla Kafka',
        },
        {
            value: KINESIS,
            name: 'AWS Kinesis',
        },
        {
            value: PUBSUB,
            name: 'Google PubSub',
        },
    ],
    messageTypesSupported: [
        {
            value: AVRO,
            name: 'Avro',
        },
        {
            value: JSON,
            name: 'JSON',
        },
    ],
    baseConfig: {
        firstBinder: 'firstBinder',
        secondBinder: 'secondBinder',
        combinationCode: 'combinationCode',
        binderConfig: 'binderConfig',
        processors: 'processors',
        dockerPrefix: 'dockerPrefix',
        maintainer: 'maintainer',
    },
    baseConfigDefaults: {
        firstBinder: CONFLUENT_KAFKA,
        secondBinder: CONFLUENT_KAFKA,
        combinationCode: 'ckck',
        binderConfig: {
            firstBinder: {},
            secondBinder: {},
        },
        processors: {},
        dockerPrefix: '',
        maintainer: '',
    },
    processorConfig: {
        processorName: 'processorName',
        input: 'input',
        output: 'output',
    },
    processorInputOutputStruct: {
        destination: 'destination',
        contentType: 'contentType',
        binder: 'binder',
    },
    ProcessorConfigDefaults,
};

module.exports = Constants;
