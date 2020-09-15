# DX26 - Application Scaffolding

A developer spends the first few weeks of development time in setting up a project,
choosing the build tool, configuring all the base dependencies and plugins needed for the
application to build and towards the end they spend another week or two depending on the
platform they are planning to deploy their application.

As part of our initiative towards building Data Platform as a Service (DPaaS), we would like to
reduce this time or even completely eliminate it so that developers can jump straight into the
business logic without having to worry about the above mentioned tedious time-consuming tasks.

## Generator-DX26

Generator-dx26 is a scaffolding tool which can be used to scaffold your application. As the point
of this release we mainly focus on limited number of choices for the language, build tool, messaging systems,
and data formats, but over time we plan on adding more.

### Pre-requisites

You will need `node` installed for you to run DX26 Generators. Once you have node installed then
use the following commands.

```bash
npm install -g yo
```

### Installation

```bash
npm install -g @dx26-io/generator-dx26
```

## Generators

### BareBone

BareBone generator, as the name suggests scaffolds your application with bare minimum dependencies
and plugins needed to build your application and kick start your project

### Invocation

```bash
yo dx26:BareBone
```

### DataAcquisition 

This generator can be used when you are planning to build a message processing application which
acts as a [Messaging Bridge](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingBridge.html)
between two messaging systems, or a Stream processing application to transform, filter and curate
events in real-time.

### Invocation

```bash
yo dx26:DataAcquisition
```
