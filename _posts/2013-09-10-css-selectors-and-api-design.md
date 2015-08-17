---
layout: post
title:  "A not so common way to think about CSS"
date:   2013-09-10
categories: css
excerpt: "What's your mental model of the relationship between CSS selectors and HTML documents? This post investigates the effect of different answers to this question."
---

<p>Here is how lots of people I've talked to conceptualize the relationship between CSS and HTML: you use HTML to structure information in a hierarchical way, and you <strong>attach</strong> styles to sets of elements, sort of from the outside.</p>
<pre> CSS    -----------&gt; HTML
(styles)  "attach"  (document)
</pre>
<p>That's a valid way of looking at it, but it's not the only one. Also valid is the opposite:</p>
<pre> CSS    &lt;---------- HTML
(styles)   &lt;verb&gt;  (document)</pre>
<p><span>In this view, it's the document that does something to the styles. If you find it hard to see it that way, read on. If it's already totally clear to you, this is your chance to go and read something else.</span></p>
<p><em><span>Caution: this article assumes that you have some programming knowledge.</span></em></p>
<p><strong>In more concrete terms</strong></p>
<p>What is the verb in the above diagram? There are multiple names that fit: "use", "call", and "invoke" all work fine. Here is a rough sketch of what that relationship means: The document serves as the input to a list of structural patterns, and it can <strong>invoke</strong> the style declarations associated with a particular pattern by having a matching structure:</p>
<pre> CSS    &lt;---------- HTML
(pattern)  invoke  (structure)
</pre>
<p>Here is a silly example:</p>
<p><strong>CSS</strong></p>
<pre>.date { color: #aaa; }
.comment .date { font-size: 10px; }
</pre>
<p><strong>HTML</strong></p>
<pre>&lt;div class="comment"&gt;
  &lt;div class="whatever"&gt;
    &lt;span class="date"&gt;2013-09-10&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>
<p><em>(Note that this example is not a recommendation for how to write good CSS code or markup.)</em></p>
<p>And here is how the example translates into patterns and the structure of document fragments:</p>
<p><strong>Patterns:</strong></p>
<pre>.date
.comment .date
</pre>
<p><strong>Structure of document fragments (incomplete list):</strong></p>
<pre>span
div
.comment
.date
div div
div div span
div span
.whatever span
.comment .date
&hellip;
</pre>
<p>You can imagine the document as being the user of the style sheet who tries to get the parameters right in order to match the interfaces (or patterns) the style sheet exposes. It is analogous to a programmer who wants to use an API and looks up function signatures to find out what the expected arguments are.</p>
<p>Now what's that view useful for?</p>
<p><strong>Learn from analogous models</strong></p>
<p>If the document encodes something analogous to function calls, then things we know about function calls may also be valid for the document/style-sheet relationship.</p>
<p>When designing function signatures, common questions to ask are:</p>
<ul>
<li><span>How much does the function know/assume about its potential calling contexts?</span></li>
<li><span>Are there other valid uses of it than the ones I am considering?</span></li>
<li><span>Can I reduce coupling (between specific use cases and the interface the function provides) by making the arguments less specific?</span></li>
</ul>
<p>With the proposed model, you can design a style sheet as if it were a programming interface and ask very similar questions:</p>
<ul>
<li><span>How much do the selectors know/assume about the structure of document fragments?</span></li>
<li><span>Can I think of other user interface elements that would want to use the same styles?</span></li>
<li><span>Can I reduce coupling (between specific use cases and the selector pattern I provide) by making the selector less specific?</span></li>
</ul>
<p><span>A similar design principle you can apply to style sheets is the <a href="http://en.wikipedia.org/wiki/Law_of_Demeter">Law of Demeter</a> or "principle of least knowledge". (It is not really a law by any commonly used definition of "law", but that's what it's called anyway.) Let's look at a few (possibly terrible) selectors and see how much they know about more or less related document fragments:</span></p>
<pre>a) #post-123
b) ul.comments li ul li
c) .foo .bar
d) .foo.bar
e) .tweet &gt; .avatar
f) .post hr
</pre>
<p><span>Selector <em>a</em> knows about only one value. It's the equivalent of writing a function that only accepts one value:</span></p>
<pre>def seven_times_two(x)
  if x == 7
    14
  else
    nil
  end
end
</pre>
<p>That's sort of a silly thing to do, but it doesn't violate the Law of Demeter.</p>
<p>Selector <em>b</em> aims to affect some set of list items, but in order to get at them, it takes quite a detour and mentions all kinds of landmarks along the way. Here is some analogous pseudo-code to illustrate that kind of interface:</p>
<pre>def styles_for_special_list_item(li)
  if li.parent(:ul).parent(:li).parent(:ul, :class =&gt; :comments)
    {:color =&gt; 'black'}
  else
    nil
  end
end
</pre>
<p>That's clearly an example of a selector/function that violates the principle of least knowledge.</p>
<p>I'll leave the other examples as an exercise for the reader.</p>
<p><strong>Okay, got it. What's next?</strong></p>
<p>After this short tour through overlapping mental models, go and check out some of the suggestions people have made for how to write good CSS code and try to see how they make sense or how you could explain them in different terms if you think of a style sheet as a programming interface:</p>
<ul>
<li>OOCSS by Nicole Sullivan</li>
<li>Block-Element-Modifier (BEM) by&nbsp;Yandex</li>
<li>Functional CSS (FCSS) by Wealthfront</li>
</ul>
<p>Also, go back to some code you're working with and answer the interface design questions above.</p>
<p>That's it for now. I am <a href="http://twitter.com/fronx">@fronx</a> on Twitter.</p>