<template>
    <div id="desktop-member-confirm">
        <h2 class="content animate__animated animate__fadeInDown">관리자 승인 목록</h2>
        <table class="content animate__animated animate__fadeInDown">
            <colgroup>
                <col style="width: 100px;" />
                <col />
                <col style="width: 250px;" />
                <col style="width: 120px;" />
                <col style="width: 150px;" />
            </colgroup>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>아이디</th>
                    <th>근무반</th>
                    <th>이름</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5">
                        <div class="scroll">
                            <table>
                                <colgroup>
                                    <col style="width: 100px;" />
                                    <col />
                                    <col style="width: 250px;" />
                                    <col style="width: 120px;" />
                                    <col style="width: 137px;" />
                                </colgroup>
                                <tbody v-if="unconfirmedMembers && unconfirmedMembers.length > 0">
                                    <tr :key="i" v-for="(member, i) in unconfirmedMembers">
                                        <td>{{ i + 1 }}</td>
                                        <td>{{ member.username }}</td>
                                        <td>{{ member.workClass }}</td>
                                        <td>{{ member.workerName }}</td>
                                        <td><input type="button" value="승인" @click="confirm(member.username)" /></td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr><td colspan="5">No data</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import MemberConfirmMixin from "./MemberConfirmMixin";

    export default {
        name: "DesktopMemberConfirm",
        mixins: [MemberConfirmMixin]
    }
</script>

<style>
    @import "./Desktop.css";
</style>
