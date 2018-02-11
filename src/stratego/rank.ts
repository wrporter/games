/* tslint:disable:object-literal-sort-keys */

export enum Rank {
    Bomb = "Bomb",
    Marshal = "Marshal",
    General = "General",
    Colonel = "Colonel",
    Major = "Major",
    Captain = "Captain",
    Lieutenant = "Lieutenant",
    Sergeant = "Sergeant",
    Miner = "Miner",
    Scout = "Scout",
    Spy = "Spy",
    Flag = "Flag",
}

export function getAllRanks(): string[] {
    return Object.keys(Rank);
}

export function getRankValue(rank: Rank) {
    return RankToValue[rank];
}

export function getRank(rankValue: number) {
    return ValueToRank[rankValue];
}

export function getRankKey(rank: Rank): string {
    const rankValue = RankToValue[rank];
    if (rankValue === 0) {
        return "B";
    } else if (rankValue === 10) {
        return "S";
    } else if (rankValue === 11) {
        return "F";
    } else {
        return RankToValue[rank].toString();
    }
}

const RankToValue: { [key: string]: number } = {};
RankToValue[Rank.Bomb] = 0;
RankToValue[Rank.Marshal] = 1;
RankToValue[Rank.General] = 2;
RankToValue[Rank.Colonel] = 3;
RankToValue[Rank.Major] = 4;
RankToValue[Rank.Captain] = 5;
RankToValue[Rank.Lieutenant] = 6;
RankToValue[Rank.Sergeant] = 7;
RankToValue[Rank.Miner] = 8;
RankToValue[Rank.Scout] = 9;
RankToValue[Rank.Spy] = 10;
RankToValue[Rank.Flag] = 11;

const ValueToRank: { [key: number]: Rank } = {};
ValueToRank[0] = Rank.Bomb;
ValueToRank[1] = Rank.Marshal;
ValueToRank[2] = Rank.General;
ValueToRank[3] = Rank.Colonel;
ValueToRank[4] = Rank.Major;
ValueToRank[5] = Rank.Captain;
ValueToRank[6] = Rank.Lieutenant;
ValueToRank[7] = Rank.Sergeant;
ValueToRank[8] = Rank.Miner;
ValueToRank[9] = Rank.Scout;
ValueToRank[10] = Rank.Spy;
ValueToRank[11] = Rank.Flag;
