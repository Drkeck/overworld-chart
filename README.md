# Overworld chart
this is an attempt at a 3D map ui for storing info in a more "Overworld" like approch, much like the overworlds of video games and fantasy cartogrophy.
the intended implimentation of this is to use something akin to a 3d engine to display a map object that we can then texture and add elements ontop of.
Hopefully we can make this whole thing 3d and keep the overall rendering needed low to keep this as low level as we need.
there are a handful of ways we can impliment this but for now we are going to experiment to find the best way to do so.

## Notes

- Likely going to start with three.js
- made a small 3d model in blender to use in three.js
- also going to use a test map [that i found on a reddit post.](https://www.reddit.com/r/inkarnate/comments/w109fx/alurna_just_a_good_ol_homebrew_fantasy_map_for_my/) its not mine and i wont claim it but it was used as an easy find example that can be refrenced. 
  - this was stored in our `DOWNLOADS` section.
- was able to get a 3d modle into 3.js and render on the screen after adding some lighting.
- Due to above point i think im going to look into 3.js tutorials for things like setting up depth and potentially doing things like water physics that would be cool
  - does also make me wonder why not do this in blender and not in a engine like 3.js and to that i say learning opertunities and both are valid, while also sighting i want to work with game stuff so code to 3d is going to be a thing.