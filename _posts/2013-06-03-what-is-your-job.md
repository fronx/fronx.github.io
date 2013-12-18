---
layout: post
title:  "What is your job?"
date:   2013-06-03
summary: "Thoughts on dependencies and responsibility."
---

Here are some thoughts on dependencies, what they are good for, and how they can make your life harder. They are written from the perspective of a programmer.

## tl;dr

<ul>
<li>There is such a thing as an artificial dependency on other people. Recognize and remove those dependencies.</li>
<li>Others don't necessarily know what your job is. You do.</li>
<li>If you feel like you have to ask for permission to do your job, you don't</li>
</ul>

## Artificial dependencies

There was a time in my life where it was considered not okay, or even impossible, to go to the bathroom without asking the teacher. Somebody must have thought it was a good idea to introduce an artificial dependency between children being able to function properly as biological organisms and another person's judgement. Ridiculous, when you think about it as a grownup person who can freely decide about such matters.

Fast-forward a couple decades. You sit in a meeting where people talk about roadmaps and projects and plans, and you know that in the end it's you who will do the work of building the things people have decided are needed, and you're kind of okay with this setup. You see the benefit of decoupling the technical work of understanding problems and finding solutions, from the strategic work of defining objectives. Somebody has to do the work you're not doing, and you're glad that it's not you, because you're much better at something else: turning a list of requirements into something a computer (or data center) can execute, and in order to achieve that, you go through a complex process where you think about every single detail the computer needs to know.

But every now and then, you may feel like the strategically thinking people ought to care more about certain issues you personally care about. You want them to understand, and reflect that understanding by adjusting their plans, since it's your understanding that the plans define what you will be doing.

Let's look at a list of activities that may be familiar to you and see whether these things need to be mentioned and agreed on in planning meetings, or more generally where you depend on others in order to do them:

<ul>
<li>write automated tests</li>
<li>add caching to a web service</li>
<li>divide some code into modules</li>
<li>define what the next few most important features are</li>
<li>get up for 10 minutes every hour and stretch</li>
<li>refactor some code to make an upcoming change easier</li>
<li>introduce a new internal service as part of the system architecture</li>
<li>add some monitoring endpoints and create a dashboard so you can see what the system is doing</li>
<li>automate something your team frequently does manually</li>
<li>get a coffee in the morning</li>
<li>replace a templating language with a different one</li>
<li>hire a new team member</li>
<li>go home when you need some quiet time to think</li>
<li>add or remove service instances according to the current load</li>
</ul>

## Responsibility

Let's not actually go through all the points in the list and explain whether you depended on others to do them. You are the person who knows what your job is, what your expertise is. Whenever you think, "I could just do it. They don't even understand what it is that I'm proposing.", chances are you are making your own and your coworkers' jobs harder by imposing a choice onto them that they are not qualified or authorized to make.

The next thing that usually happens is that they ask you questions about the actions you proposed. They may ask how long it would take, what alternatives exists, what the benefit is compared to not doing it, how urgent it is, by how much it would delay other things&mdash;good questions that ideally you would have asked yourself in advance and come to the conclusion that it needs to be done and that it's worth spending the time doing it.

If you've done that, there is no point in waiting for permission. The only thing you need to do is set expectations. If it affects them at all, tell them what's needed and why and how long you expect it to take. If it doesn't really affect anyone, don't even bother telling them. It is nobody's job to micro-manage you, so don't let your actions imply it was.

Some dependencies are only in your head, and it's better to not let them leak, and even better to remove them from your thinking process entirely, and instead, concentrate on what you're good at, understand the requirements, and set expectations.
