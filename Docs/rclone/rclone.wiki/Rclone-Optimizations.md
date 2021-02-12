# Rclone Optimizations

Ideas for optimizations which should be documented in the main docs eventually.

## When to use/not use --no-traverse:

Let's say you have a destination with 6 files {a,b,c,d,e,f}.

If you are copying {a} to the destination then without no-traverse, rclone will load in the definitions for all the files {a,b,c,d,e,f} before discovering whether {a} needs to be uploaded. If you use --no-traverse rclone will just check {a} on the remote.

So why wouldn't you use --no-traverse all the time?

If you are copying {a,b,c,d,e,f} to the destination, then rclone will check each file individually. This will take at least 6 transactions, whereas likely you could have got the listing for all the objects done in 1 listing.

So there are tradeoffs! The new sync method implemented in 1.36 makes --no-traverse less useful than it used to be, but it can still come in handy, especially if you are moving or copying files into a deep hierarchy.

## How to run on a micro instance

RClone on a micro instance with less than a gig of memory may crash. Here is what you can do:
* type `export GOGC=20` before running rclone.
* remove `--fast-list`
* lower the value of `--transfers=`
