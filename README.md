# MIDI Conversion Fixture Data

Small, reproducible reference tables for evaluating a single-line audio-to-MIDI
detector. The data describes controlled synthetic fixtures, not a general
accuracy score for music transcription.

Source site: [MIDI Convert](https://midiconvert.com/audio-to-midi)

## Included datasets

- `data/codec-compression-results.csv`: a fixed eight-note C4/E4 alternating
  source, encoded and decoded as MP3, AAC, and Opus before detection.
- `data/song-mixture-results.csv`: the same detector run against melody-only,
  melody-plus-chords, and melody-plus-chords-plus-percussion synthetic sources.

Each value is the median of ten generated WAV repetitions at that parameter
point. The fixtures use 44.1 kHz mono 16-bit PCM WAV input before encoding,
Melody / solo instrument mode, Balanced sensitivity, a 2048-sample analysis
window, and a 1024-sample hop.

## Matching rule

A target note is retained only if exactly one output event overlaps at least
50% of that target note and is within 50 cents of its declared pitch. A missed
note has no such output. An extra event is unmatched, or is a second output
event assigned to one target.

## Results

The codec fixture retained all eight target notes at the tested 128 kbps MP3,
192 kbps MP3, 320 kbps MP3, 128 kbps AAC, and 128 kbps Opus settings. This
does not establish that platform audio compression has no effect on arbitrary
music: the source is short, clean, monophonic, and deliberately simple.

The mixture fixture retained seven of eight target notes for melody only, then
zero of eight when chord triads were added. Adding kick and high percussion did
not change the median results in that fixture. Under these conditions, chord
tones were the observed boundary for this single-line detector.

## Reproduction notes

The measurements were made with Node.js `v24.19.0`, FFmpeg `9.0.2`, and the
detector source SHA-256 below. The original result manifests are not included
because they contain generated media fixtures. The CSV files here are a compact
data release of their median result rows.

Detector SHA-256:

`DDA185AC8FB6A179A4FCFA73FD4197ACC95B8B6F59B233F5D3E330F596309F9F`

To validate the shipped rows without network access:

```text
node scripts/verify-datasets.js
```

## Limits

These are controlled synthetic source checks. They are not a benchmark for
voices, instruments, complete songs, stem separation, chord transcription, or
multi-track MIDI extraction.

