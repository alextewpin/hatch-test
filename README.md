# hatch-test

[Demo](https://alextewpin.github.io/hatch-test/)

### Implementation Notes

It seems that point of assignment was to implement a vitrualized table (which I did). However, on such a small dataset regular table works mostly fine. Virtualized version have 60 FPS performance most of the time, I've tested it on my laptop with 6x slowdown and an iPhone SE. However, from time to time it could skip a beat, which may result in an blank content for a frame in certain cituations. I don't think it's fixable without dropping React and generating table content DOM by hand. React-virtualized same problem and about the same performance.

For styling I usually use styled-components, however styled Material-UI components have some issues with typings, so I've opted in for plain CSS. Also, it's way more performant that way.

Table component does not use any Material-UI components due to massive 6x performance drop from runtime style generation and context calls.

React.StrictMode is not used due to issues with Material-UI.

Demo should work fine on any fairly modern browser. I've tested it on Chrome, Safari and Firefox.

### Possible Improvements

- Implement indexed text search for large datasets
- Go for direct DOM manipulation and node caching
- Use actual table instead of flexbox
- Improve semanthics and accessibility
- Automatic header height calculation
- Resolve 100% height issue on iOS
