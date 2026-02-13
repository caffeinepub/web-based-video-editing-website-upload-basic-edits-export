# Specification

## Summary
**Goal:** Build a responsive, single-page, web-based video editor that loads a local video in-browser, supports basic edits (trim, mute, speed), can export an edited video for download, and can save/reopen project metadata via a lightweight backend.

**Planned changes:**
- Create a responsive single-page editor UI with local video file selection, preview player, timeline/trim controls, current time display, and a properties panel.
- Implement basic editing controls affecting the preview immediately: trim in/out range, mute/unmute, and playback speed (0.5x–2x).
- Add an export flow with progress indication, downloadable output on success, and actionable error handling with retry.
- Implement a backend project model (metadata only) to create, update, fetch, and list projects with name, timestamps, and edit settings.
- Connect UI to backend to name/save projects and reopen them to restore edit settings, with frontend error states that preserve the currently loaded local video.
- Apply a cohesive creative visual theme (not blue/purple dominated) across landing/editor screens with clear hierarchy.
- Render generated static logo and hero/illustration images from `frontend/public/assets/generated` in the UI responsively without layout shift.

**User-visible outcome:** Users can load a video from their device, preview it, trim/mute/change speed, export an edited downloadable video with progress feedback, and save/list/reopen named projects that restore the edit settings.
