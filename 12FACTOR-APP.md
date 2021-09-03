## A. Overview

In this tutorial, we'll understand the twelve-factor app methodology.

We'll also understand how to develop a microservice with the help of Spring Boot. In the process, we'll see how to apply the twelve-factor methodology for developing such a microservice.

## B. What Is the Twelve-Factor Methodology?

The twelve-factor methodology is a set of twelve best practices to develop applications developed to run as a service. This was originally drafted by Heroku for applications deployed as services on their cloud platform, back in 2011. Over time, this has proved to be generic enough for any software-as-a-service (SaaS) development.

So, what do we mean by software-as-a-service? Traditionally we design, develop, deploy, and maintain software solutions to derive business value from it. But, we don't have to engage in this process to achieve the same result necessarily. For instance, calculating applicable tax is a generic function in many domains.

Now, we may decide to build and manage this service our selves or subscribe to a commercial service offering. Such service offerings are what we know as software-as-a-service.

# 12 Factor App:

## 1. CodeBase

The first principle of the Twelve-Factor Apps is that every application should have just a single codebase. However, multiple deployments are possible.

If an app has multiple codebases, it is a violation of the 12 Factor Application methodologies, and in such case, the app becomes a distributed system. But, each component in a distributed system is an app and can comply with the 12-Factors.

## 2. Dependencies

The second 12-Factor App Dependencies principle says that your app might depend on external packages or libraries. Still, we should never think that these will be available on the target system. Therefore, an app must always declare all the dependencies and their correct versions explicitly.

## 3. Config

Because an app’s config varies between several deploys, storing it as constants in code is a violation of 12 Factor. Please note that the “config” here doesn’t mean the app’s internal config as it doesn’t vary between deploys and is best stored in code.

## 4. Backing Services

In a 12-Factor App, Backing Services means any attached services that the app consumes over the network for executing its normal operations. These services can either be locally-managed or can be some third parties.

## 5. Build, Release, Run

Build, release, and run are three important stages of the Software Development Life Cycle.

## 6. Processes

An app is executed in an execution environment as a collection of one or more processes. And 12 Factor processes are stateless and share nothing.

## 7. Port-Binding

A Twelve-Factor App acts as a standalone service and doesn’t require runtime injection of a webserver in an execution environment to make a web-facing service.

## 8. Concurrency

This 12 Factor principle is related to scaling the application, and it says you should deploy more copies of your application instead of making your app larger. Basically, it supports horizontal scaling of an app instead of vertical scaling.

## 9. Disposability

The 12 Factor App disposability principle focuses on maximizing an application’s robustness with fast startup and graceful shutdown. It states that an app’s processes are disposable, which means:

### . These can start and end at a moment’s notice

### . Are robust against sudden failure or app crash

### . Can shut down gracefully

## 10. Dev/Prod Parity

The Twelve Factor App Methodology suggests that the development, staging, and production of an app should be as similar as possible to ensure that anyone can understand and release it.

## 11. Logs

The rule suggests treating logs as event streams. Logging is crucial for keeping a check on the behavior of your application. However, 12-Factor apps shouldn’t be concerned with the management of these logs.

### 12. Admin Processes

Though this rule is not related to developing services, it is more about managing your application but is still essential. It says that apps should run management or admin tasks in an identical environment as the app’s regular and long-running processes
