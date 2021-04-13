class FluidSynth < Formula
  desc "Real-time software synthesizer based on the SoundFont 2 specs"
  homepage "http://www.fluidsynth.org"
  url "https://github.com/FluidSynth/fluidsynth/archive/v1.1.11.tar.gz"
  sha256 "da8878ff374d12392eecf87e96bad8711b8e76a154c25a571dd8614d1af80de8"

  bottle do
    root_url "https://github.com/pygame/homebrew-portmidi/releases/download/bottles0"
    sha256 "7ddf078779748766cdf075e72bc5c9c4bd3df2abe93b3886fd804cb0490fa0d3" => :mojave
    sha256 "6c2210c1599c19c1fa1a8ceb5a043cd6a8b598475cc3f500c9cb0b341d0a0288" => :high_sierra
    sha256 "b4b6a73a0c1eaf23df645973f4d951eca4ef4921b59af02d9fa986d0a4a27089" => :sierra
    sha256 "d86f4c855c358ebf7d8fb766774e698e78af1022b90edb930bb9657a41d1481a" => :el_capitan
  end

  depends_on "pygame/portmidi/pg-cmake" => :build
  depends_on "pkg-config" => :build
  depends_on "pygame/portmidi/glib"
  depends_on "pygame/portmidi/libsndfile"
  depends_on "pygame/portmidi/portaudio"

  def install
    args = std_cmake_args
    args << "-Denable-framework=OFF" << "-DLIB_SUFFIX="
    args << "-Denable-portaudio=ON" if build.with? "portaudio"
    args << "-Denable-libsndfile=OFF" if build.without? "libsndfile"

    mkdir "build" do
      system "cmake", "..", *args
      system "make", "install"
    end
  end

  test do
    assert_match /#{version}/, shell_output("#{bin}/fluidsynth --version")
  end
end
