import { createAction, handleActions } from 'redux-actions';

export const PLAY_MUSIC = 'PLAY_MUSIC';
export const PAUSE_MUSIC = 'PAUSE_MUSIC';

export const PLAY_NEXT_SONG = 'PLAY_NEXT_SONG';
export const PLAY_NEXT_SONG_SUCCESS = 'PLAY_NEXT_SONG_SUCCESS';
export const PLAY_NEXT_SONG_FAILURE = 'PLAY_NEXT_SONG_FAILURE';

export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const UPDATE_PLAYLIST_SUCCESS = 'UPDATE_PLAYLIST_SUCCESS';
export const UPDATE_PLAYLIST_FAILURE = 'UPDATE_PLAYLIST_FAILURE';

export const PLAYER_STATUS = {
    IDLE: 2,
    PLAYING: 1,
    PAUSED: 0
};

// 播放音乐
export const playMusic = createAction(PLAY_MUSIC);
// 暂停音乐
export const pauseMusic = createAction(PAUSE_MUSIC);

// 播放下一首音乐
export const playNextSong = createAction(PLAY_NEXT_SONG);
export const playNextSongSuccess = createAction(PLAY_NEXT_SONG_SUCCESS);
export const playNextSongFailure = createAction(PLAY_NEXT_SONG_FAILURE);

// 更新播放列表
export const updatePlaylist = createAction(UPDATE_PLAYLIST);
export const updatePlaylistSuccess = createAction(UPDATE_PLAYLIST_SUCCESS);
export const updatePlaylistFailure = createAction(UPDATE_PLAYLIST_FAILURE);

// 初始 state
export const INITIAL_STATE = {
    // 播放列表
    playlist: [],
    // 当前正在播放歌曲序号
    current: -1,
    // 下一首可播放歌曲序号
    next: 0,
    // 2：没有音乐在播放，1：播放中，0：暂停中
    status: PLAYER_STATUS.IDLE,
    // 当前播放歌曲信息
    playing: {
        url: '',
        cover: '',
        title: '',
        artist: '',
        length: 0,
        like: false
    },
};

export default handleActions({
    PLAY_MUSIC: (state, action) => ({
        ...state
    }),
    PLAY_NEXT_SONG_SUCCESS: (state, action) => ({
        ...state,
        current: action.payload.current,
        next: action.payload.next,
        playing: action.payload.playing
    }),
    PLAY_NEXT_SONG_FAILURE: (state, action) => ({
        ...state,
        playing: INITIAL_STATE.playing
    }),
    UPDATE_PLAYLIST_SUCCESS: (state, action) => ({
        ...state,
        next: 0,
        playlist: action.payload.map(src => ({
            url: src.url,
            cover: src.picture,
            title: src.title,
            artist: src.artist,
            length: src.length,
            like: src.like === 1
        }))
    })
}, INITIAL_STATE)
